<script>
	import Spinner from '../spinner/spinner.svelte';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { loading } from '../stores/store';
	import { goto } from '$app/navigation';
	import { generateFormSubmitted } from '../stores/store';
	import { getUserId } from '../utils/auth';
	import { getAccessTokenFromLocalStorage } from '../utils/auth';

	let answer = '';
	let selectedSize = '';
	let inputDetails = '';

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
		inputDetails = e.target['input'].value;
		loading.set(true);
		const userId = getUserId();

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
	}
</script>

<Spinner />

<div class="container min-w-full max-w-screen-xl w-full flex flex-row">
	<div class="l-container w-2/5 bg-gray-100 h-screen flex flex-col items-center">
		<div class="prompt-box flex flex-col w-5/6 bg-white mt-6">
			<div>
				<span class="mr-12 ml-5 mt-4">Describe your creation in detail</span>
				<button on:click={populateRandomPrompt} class="ml-8 bg-gray-100 mt-4 px-2 py-2 text-sm"
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
		</div>

		<div class="size-box flex flex-col w-5/6 bg-white mt-10">
			<p class="font-bold ml-5">Pick your size</p>
			<div class="size-choice flex flex-col items-center mt-5">
				<button
					on:click={() => updateSelectedSize('256x256')}
					class="size-button bg-pink-700 w-1/2 px-3 py-3 rounded-md text-white mb-5">256x256</button
				>
				<button
					on:click={() => updateSelectedSize('512x512')}
					class="size-button bg-pink-700 w-1/2 px-3 py-3 rounded-md text-white mb-5">512x512</button
				>
				<button
					on:click={() => updateSelectedSize('1024x1024')}
					class="size-button bg-pink-700 w-1/2 px-3 py-3 rounded-md text-white mb-5"
					>1024x1024</button
				>
			</div>
		</div>
	</div>
	<div class="r-container w-3/5 flex justify-center items-center">
		{#if $generateFormSubmitted}
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src={answer} alt="a picture" />
		{:else}
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src="/src/images/grid-image.jpeg" alt="grid picture" />
		{/if}
	</div>
</div>
