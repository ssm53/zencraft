<script>
	import Spinner from '../spinner/spinner.svelte';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { loading } from '../stores/store';
	import { goto } from '$app/navigation';
	import { generateFormSubmitted } from '../stores/store';
	import { getUserId } from '../utils/auth';
	import { getAccessTokenFromLocalStorage } from '../utils/auth';
	import { makePayment } from '../utils/alert';

	let answer = '';
	let selectedSize = '512x512';
	let inputDetails = '';
	const userId = getUserId();
	// // testing
	// let totalPrompts;
	// // end testing

	const promptOptions = [
		'Pixel art dragon, adorable, big eyes, magical and dreamy, blender render, 8k, fantasy colors, soft texture',
		'Car from the future driving on water',
		'Huge glass force field dome covering a science fiction metal town, oil painting, heavy strokes, paint dripping',
		'An expressive oil painting of a soccer player scoring, depicted as an explosion of a nebula',
		'Temple in ruins, forest, stairs, columns, cinematic, detailed, atmospheric, epic, concept art, matte painting, background, mist, photo-realistic, concept art, volumetric light',
		'Futuristic robot making coffee in a cafe',
		'Cabin in the center of a lake surrounded by forest, landscape photography, 4k',
		'Futuristic interior design for 2035, luxury, chic and elegant',
		'a surrealist dream-like oil painting by Salvador Dalí of a cat playing checkers',
		"a macro 35mm photograph of two mice in Hawaii, they're each wearing tiny swimsuits and are carrying tiny surf boards, digital art",
		'teddy bears shopping for groceries, one-line drawing'
	];

	// Function to update selectedSize when a size button is clicked
	function updateSelectedSize(size) {
		selectedSize = size;
	}

	// Function to populate the form with a random item from promptOptions
	function populateRandomPrompt() {
		const randomIndex = Math.floor(Math.random() * promptOptions.length);
		const randomPrompt = promptOptions[randomIndex];

		// Set the input field value
		const inputField = document.querySelector('input[name="input"]');
		if (inputField) {
			inputField.value = randomPrompt;
		}

		// Set the inputDetails variable
		inputDetails = randomPrompt;
	}

	async function handleSubmit(e) {
		e.preventDefault();
		loading.set(true);

		// here we're doing api call to get no of prompts remaining, to see if user can do api call or not. if number is <5,, then can
		const resp2 = await fetch(PUBLIC_BACKEND_BASE_URL + `/prompts-remaining/${userId}`, {
			method: 'GET'
		});

		const res2 = await resp2.json();
		const promptsRemaining = Number(res2.promptsRemaining);
		// no of prompt remaining api ends here

		inputDetails = e.target['input'].value;

		if (promptsRemaining > 0) {
			try {
				const resp = await fetch(`${PUBLIC_BACKEND_BASE_URL}` + '/get-art', {
					method: 'POST',
					mode: 'cors',
					headers: {
						'Content-Type': 'application/json',
						Authorization: getAccessTokenFromLocalStorage()
					},
					body: JSON.stringify({ prompt: inputDetails, size: selectedSize, userId: userId })
				});
				if (resp.status === 200) {
					loading.set(false);
					const res = await resp.json();
					console.log(res);
					answer = res.text[0].url;
					generateFormSubmitted.set(true);
					// here we do api call to increment no of prompts of this user by 1
					const resp2 = await fetch(`${PUBLIC_BACKEND_BASE_URL}` + `/inc-no-of-prompts/${userId}`, {
						method: 'POST',
						mode: 'cors',
						headers: {
							'Content-Type': 'application/json'
							// Authorization: getAccessTokenFromLocalStorage()
						}
					});
				} else {
					loading.set('false');
					// Handle other status codes here
					console.error('Error:', resp.status);
				}
			} catch (error) {
				loading.set(false);
				// Handle network errors or exceptions
				console.error('Error:', error);
			} finally {
				loading.set(false);
				console.log('aiyo');
			}
		} else {
			makePayment();
			goto('/payment');
			// do alert here
		}
	}

	// // testing
	// async function getNoOfPrompts() {
	// 	const userId = getUserId();

	// 	const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/no-of-prompts/${userId}`, {
	// 		method: 'GET'
	// 	});

	// 	const res = await resp.json();
	// 	console.log(res);
	// 	console.log(typeof res);

	// 	if (resp.status === 200) {
	// 		totalPrompts = res.promptNumber;
	// 		console.log(totalPrompts);
	// 		console.log(typeof totalPrompts);

	// 		// console.log(res);
	// 		// return {
	// 		// 	noOfPrompts: res.promptNumber
	// 		// };
	// 	} else {
	// 		console.log('cannot get no of prompts');
	// 	}
	// }
	// //end testing
</script>

<Spinner />

<div class="container min-w-full max-w-screen-xl w-full flex flex-row">
	<div class="l-container w-2/5 bg-pink-700 h-screen flex flex-col items-center">
		<div class="prompt-box flex flex-col w-5/6 bg-white mt-6 border rounded-lg">
			<div>
				<span class="mr-12 ml-5 mt-4">Describe your creation in detail</span>
				<button
					on:click={populateRandomPrompt}
					class="ml-8 bg-gray-100 mt-4 px-2 py-2 text-sm rounded-md hover hover:bg-black hover:text-gray-100 hover:rounded-md"
					>Surprise me</button
				>
			</div>
			<form on:submit={handleSubmit} class="bg-white shadow-md rounded-lg p-8">
				<div class="mb-6">
					<label for="input" class="block text-gray-700 text-sm font-bold mb-2">
						Give a detailed description
					</label>
					<input
						type="text"
						name="input"
						placeholder="Give your prompt"
						class="block w-full rounded-md py-2 px-3 border border-gray-300 h-32 text-sm shadow-sm shadow-gray-500"
					/>
				</div>
				<div class="flex justify-center mt-8">
					<button
						class="bg-green-500 hover:bg-green-600 w-60 text-white font-bold py-2 px-4 rounded-md"
						type="submit"
					>
						Generate
					</button>
				</div>
			</form>
			<!-- <button on:click={getNoOfPrompts}>click me</button> -->
		</div>

		<div class="size-box flex flex-col w-5/6 bg-white mt-10 border rounded-lg">
			<p class="font-bold ml-5">Pick your size</p>
			<div class="size-choice flex flex-col items-center mt-5">
				<button
					on:click={() => updateSelectedSize('256x256')}
					class="size-button bg-pink-700 w-1/2 px-3 py-3 rounded-md text-white mb-5 border-2 border-pink-700 hover hover:rounded-md hover:text-pink-700 hover:bg-gray-200 hover:border-2 hover:border-pink-700"
					>256x256</button
				>
				<button
					on:click={() => updateSelectedSize('512x512')}
					class="size-button bg-pink-700 w-1/2 px-3 py-3 rounded-md text-white mb-5 border-2 border-pink-700 hover:text-pink-700 hover:bg-gray-200 hover:border-2 hover:border-pink-700"
					>512x512</button
				>
			</div>
		</div>
	</div>
	<div class="r-container w-3/5 flex flex-col justify-center items-center">
		{#if $generateFormSubmitted}
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src={answer} alt="a picture" />
			<div class="download-button flex justify-end mt-7">
				<a
					href={answer}
					download="your_image_filename.jpg"
					class="font-bold text-pink-700 border-2 px-3 py-3 border-pink-700 bg-gray-100 hover hover:bg-pink-700 hover:text-gray-100"
					target="_blank"
				>
					Download
				</a>
			</div>
		{:else}
			<img
				src="https://images.websiteplanet.com/wp-content/uploads/2020/08/9-Best-Z-Logos-and-How-to-Make-Your-Own-for-Free-image1.png"
				alt="Logo"
				class="w-20 h-20 mb-2"
			/>

			<p class=" text-pink-700 font-bold text-2xl">Your images will appear here</p>

			<!-- <div
					class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center"
				>
					<img
						src="https://images.websiteplanet.com/wp-content/uploads/2020/08/9-Best-Z-Logos-and-How-to-Make-Your-Own-for-Free-image1.png"
						alt="Logo"
						class="w-20 h-20 mb-2 ml-28"
					/>
					<p class="text-pink-700 font-bold text-2xl">Your images will appear here</p>
				</div> -->
		{/if}
	</div>
</div>
