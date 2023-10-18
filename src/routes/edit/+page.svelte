<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { loading } from '../../stores/store';
	import Spinner from '../../spinner/spinner.svelte';
	import { editFormSubmitted } from '../../stores/store';
	import { getAccessTokenFromLocalStorage } from '../../utils/auth';
	import { getUserId } from '../../utils/auth';
	import { wrongSizeAlert } from '../../utils/alert';

	let answer = '';
	const userId = getUserId();
	// upload ori image
	export async function uploadOriImage(evt) {
		// new way to check for image size
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
						const uploadImage = await fetch(PUBLIC_BACKEND_BASE_URL + '/upload-original', {
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
	}

	// upload mask image
	export async function uploadMaskImage(evt) {
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
						const uploadImage = await fetch(PUBLIC_BACKEND_BASE_URL + '/upload-mask', {
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
	}
	// making call to our backend openai api to generate edits
	export async function clickGenerateEdit(evt) {
		evt.preventDefault();
		loading.set(true);

		// here we're doing api call to get no of prompts remaining, to see if user can do api call or not. if number is <5,, then can
		const resp2 = await fetch(PUBLIC_BACKEND_BASE_URL + `/prompts-remaining/${userId}`, {
			method: 'GET'
		});

		const res2 = await resp2.json();
		const promptsRemaining = Number(res2.promptsRemaining);
		// no of prompt remaining api ends here

		const inputDetails = evt.target['input'].value;

		if (promptsRemaining > 0) {
			const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/generate-edit', {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					Authorization: getAccessTokenFromLocalStorage()
				},
				body: JSON.stringify({ prompt: inputDetails, userId: userId })
			});
			const res = await resp.json();
			console.log(res);

			if (resp.status == 200) {
				editFormSubmitted.set(true);
				loading.set(false);
				answer = res.text[0].url;
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

<div class="container min-w-full max-w-screen-xl w-full flex flex-row">
	<div class="l-container w-2/5 bg-gray-100 h-screen flex flex-col items-center">
		<div class="size-box flex flex-col w-5/6 bg-white mt-10 py-5">
			<div class=" ml-5">
				<label class="text-pink-700 font-bold" for="file">Upload Original Image</label>
				<input on:change={uploadOriImage} id="file" accept="image/*" type="file" />
			</div>
			<p class=" font-bold text-sm text-black ml-5">We only accept 512x512 sized images!</p>
		</div>
		<div class="size-box flex flex-col w-5/6 bg-white mt-10 py-5">
			<div class=" ml-5">
				<label class="text-pink-700 font-bold" for="file">Upload Mask Image</label>
				<input on:change={uploadMaskImage} id="file" accept="image/*" type="file" />
				<p class="font-bold text-sm text-black">We only accept 512x512 sized images!</p>
			</div>
		</div>
		<div class="prompt-box flex flex-col w-5/6 bg-white mt-6">
			<div>
				<span class="mr-12 ml-5 mt-4 font-bold text-pink-700">Describe your edit in detail</span>
			</div>
			<form on:submit={clickGenerateEdit} class="bg-white shadow-md rounded-lg p-8">
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
						Generate Edit
					</button>
				</div>
			</form>
		</div>
	</div>
	<div class="r-container w-3/5 flex flex-col justify-center items-center">
		{#if $editFormSubmitted}
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
		{/if}
	</div>
</div>
