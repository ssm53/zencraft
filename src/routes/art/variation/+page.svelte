<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { uploadMedia } from '../../../utils/s3-uploader';
	import {
		PUBLIC_AWS_REGION,
		PUBLIC_AWS_BUCKET,
		PUBLIC_IDENTITY_POOL_ID
	} from '$env/static/public';
	import { loading } from '../../../stores/store';

	let formErrors = {};
	let answer = '';
	let uploadedImageURL = '';

	async function uploadImage(evt) {
		// first thing here.. we're doing frontend upload image!

		const formData = new FormData();
		formData.append('file', evt.target.files[0]);
		console.log(evt.target.files[0]);
		evt.target.value = null;

		try {
			const uploadImage = await fetch(PUBLIC_BACKEND_BASE_URL + '/upload', {
				method: 'POST',
				body: formData
			});
		} catch (error) {
			console.error(error);
		}
	}

	async function clickGenerateVariation() {
		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/generate-variation', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const res = await resp.json();
		console.log(res);

		if (resp.status == 200) {
			answer = res.text[0].url;
		} else {
			if (res.error) {
				console.log('aiyo');
			}
		}
	}
	// BREAK
	// break
	// break
	// break
	// this below is our ori function for variation request
	// evt.preventDefault();
	// loading.set(true);
	// // here, we cant seem to get the image in a file in our directory using prisma.. so get it in our directory, we'll follow the tutorial kaw kaw.. i also removed the aws thingy there below..i also changed file to files for label
	// const [fileName, fileUrl] = await uploadMedia(evt.target['file'].files[0]);
	// uploadedImageURL = fileUrl;
	// const imageData = {
	// 	name: fileName,
	// 	url: fileUrl // this is our url for the picture... need to update schema also laterr
	// };
	// const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/upload-variation', {
	// 	method: 'POST',
	// 	mode: 'cors',
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	},
	// 	body: JSON.stringify(imageData)
	// });
	// const res = await resp.json();
	// console.log(res);
	// if (resp.status == 200) {
	// 	// spinner shits
	// 	loading.update((value) => {
	// 		return false;
	// 	});
	// 	answer = res.text[0].url;
	// 	console.log('success');
	// } else {
	// 	// spinner shits
	// 	loading.update((value) => {
	// 		return false;
	// 	});
	// 	// const res = await resp.json();
	// 	if (res.error) {
	// 		formErrors = res.error; // Update formErrors with validation errors
	// 	}
	// }
	// must add another closing bracket at the bottom here for function.. basically need to create another function to do this
</script>

<div>
	<label for="file">Upload an Image</label>
	<input on:change={uploadImage} id="file" accept="image/*" type="file" />
</div>
<div>
	<button on:click={clickGenerateVariation}> Generate variation </button>
</div>

<div>
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<img src={answer} alt="a picture" />
</div>

<!-- <svelte:head>
	<script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

<div class="bg-white min-h-screen">
	<header class="bg-gray-100 shadow">
		<div class="container mx-auto py-4">
			<h1 class="text-2xl font-semibold text-gray-900">Upload Your Image</h1>
		</div>
	</header>

	<main class="container mx-auto py-8">
		<div class="flex justify-center items-center">
			<form on:submit|preventDefault={uploadImage} class="w-1/2 bg-white shadow-md rounded-lg p-8">
				<div class="mb-6">
					<label for="file" class="block text-gray-700 text-sm font-bold mb-2">
						Choose an Image
					</label>
					<input
						type="file"
						name="file"
						class="block w-full rounded-md py-2 px-3 border border-gray-300"
					/>
				</div>

	

				<div class="flex justify-end">
					<button
						class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
						type="submit"
					>
						Generate Variation
					</button>
				</div>
			</form>
			<img src={uploadedImageURL} alt="ori picture" />
      <img src={answer} alt="a picture" />
		</div>
	</main>
</div> -->
