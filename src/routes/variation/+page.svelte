<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { generateFormSubmitted, loading } from '../../stores/store';
	import Spinner from '../../spinner/spinner.svelte';
	import { variationFormSubmitted } from '../../stores/store';
	import { getAccessTokenFromLocalStorage } from '../../utils/auth';
	import { getUserId } from '../../utils/auth';
	import { wrongSizeAlert } from '../../utils/alert';

	let formErrors = {};
	let answer1 = '';
	let answer2 = '';
	let uploadedImageURL = '';
	const userId = getUserId();

	async function uploadImage(evt) {
		// first thing here.. we're doing frontend upload image!
		// new way to check for image size
		console.log('hello1');
		const file = evt.target.files[0];
		if (file) {
			console.log('hello2');
			// Check the size of the uploaded image
			const image = new Image();
			image.src = URL.createObjectURL(file);

			image.onload = async function () {
				const width = this.width;
				const height = this.height;

				if (width === 512 && height === 512) {
					console.log('hello3');
					// Image size is 512x512, proceed with the API request
					const formData = new FormData();
					formData.append('file', file);
					evt.target.value = null;

					try {
						const uploadImage = await fetch(PUBLIC_BACKEND_BASE_URL + '/upload', {
							method: 'POST',
							body: formData
						});

						// Continue with the rest of your code after successful image upload
						// ...
					} catch (error) {
						console.error(error);
					}
				} else {
					console.log('hello4');
					wrongSizeAlert();
					evt.target.value = null; // Clear the input
				}
			};
		}
		// ends here
		// BREAK
		// // this is the ori style which works
		// const formData = new FormData();
		// formData.append('file', evt.target.files[0]);
		// console.log(evt.target.files[0]);
		// evt.target.value = null;
		// try {
		// 	const uploadImage = await fetch(PUBLIC_BACKEND_BASE_URL + '/upload', {
		// 		method: 'POST',
		// 		body: formData
		// 	});
		// } catch (error) {
		// 	console.error(error);
		// }
	}

	async function clickGenerateVariation() {
		loading.set(true);
		// here we're doing api call to get no of prompts remaining, to see if user can do api call or not. if number is <5,, then can
		const resp2 = await fetch(PUBLIC_BACKEND_BASE_URL + `/prompts-remaining/${userId}`, {
			method: 'GET'
		});

		const res2 = await resp2.json();
		const promptsRemaining = Number(res2.promptsRemaining);
		// no of prompt remaining api ends here

		if (promptsRemaining > 0) {
			const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/generate-variation/${userId}`, {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					Authorization: getAccessTokenFromLocalStorage()
				}
			});
			const res = await resp.json();
			console.log(res);

			if (resp.status == 200) {
				loading.set(false);
				variationFormSubmitted.set(true);
				answer1 = res.text[0].url;
				answer2 = res.text[0].url;
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
				loading.set(false);
				if (res.error) {
					console.log('aiyo');
				}
			}
		} else {
			goto('/payment');
			// do alert here
		}
	}
</script>

<Spinner />
<div class="top-container bg-gray-100 flex flex-col py-5 justify-center items-center">
	<div class="font-bold text-2xl text-pink-500">
		<span>Image Variation</span>
	</div>
	<div class="mt-5 ml-20">
		<label for="file">Upload an Image</label>
		<input on:change={uploadImage} id="file" accept="image/*" type="file" />
	</div>
	<div>
		<button
			on:click={clickGenerateVariation}
			class=" bg-pink-700 rounded-md border-2 border-pink-700 text-white px-3 py-3 mt-3 hover hover:border-2 hover:border-pink-700 hover:bg-gray-200 hover:text-pink-700"
		>
			Generate variations
		</button>
	</div>
	<div class="text-sm text-pink-700">
		<span> We only allow 512x512 sized images to be uploaded</span>
	</div>
</div>

<div class=" main-container min-w-full max-w-screen-xl w-full flex flex-row mt-5">
	<div
		class="l-container w-1/2 flex flex-col justify-center items-center border-r-8 border-double border-pink-700"
	>
		{#if $variationFormSubmitted}
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src={answer1} alt="a picture" />
			<div class="download-button flex justify-end mt-7">
				<a
					href={answer1}
					download="your_image_filename.jpg"
					class="font-bold text-pink-700 ml-5 border-2 px-3 py-3 border-pink-700 bg-gray-100 hover hover:bg-pink-700 hover:text-gray-100"
					target="_blank"
				>
					Download
				</a>
			</div>
		{:else}
			<div class="relative">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img src="/src/images/grid-image.jpeg" alt="grid picture" />
				<div
					class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center"
				>
					<img
						src="https://images.websiteplanet.com/wp-content/uploads/2020/08/9-Best-Z-Logos-and-How-to-Make-Your-Own-for-Free-image1.png"
						alt="Logo"
						class="w-20 h-20 mb-2 ml-28"
					/>
					<p class="text-pink-700 font-bold text-2xl">Your images will appear here</p>
				</div>
			</div>
		{/if}
	</div>
	<div class="r-container w-1/2 flex flex-col justify-center items-center">
		{#if $variationFormSubmitted}
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src={answer2} alt="a picture" />
			<div class="download-button flex justify-end mt-7">
				<a
					href={answer2}
					download="your_image_filename.jpg"
					class="font-bold text-pink-700 ml-5 border-2 px-3 py-3 border-pink-700 bg-gray-100 hover hover:bg-pink-700 hover:text-gray-100"
					target="_blank"
				>
					Download
				</a>
			</div>
		{:else}
			<div class="relative">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img src="/src/images/grid-image.jpeg" alt="grid picture" />
				<div
					class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center"
				>
					<img
						src="https://images.websiteplanet.com/wp-content/uploads/2020/08/9-Best-Z-Logos-and-How-to-Make-Your-Own-for-Free-image1.png"
						alt="Logo"
						class="w-20 h-20 mb-2 ml-28"
					/>
					<p class="text-pink-700 font-bold text-2xl">Your images will appear here</p>
				</div>
			</div>
		{/if}
	</div>
</div>
