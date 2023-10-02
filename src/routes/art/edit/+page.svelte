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

	let answer = '';
	// upload ori image
	export async function uploadOriImage(evt) {
		const formData = new FormData();
		formData.append('file', evt.target.files[0]);
		console.log(evt.target.files[0]);
		evt.target.value = null;

		try {
			const uploadImage = await fetch(PUBLIC_BACKEND_BASE_URL + '/upload-original', {
				method: 'POST',
				body: formData
			});
		} catch (error) {
			console.error(error);
		}
	}
	// upload mask image
	export async function uploadMaskImage(evt) {
		const formData = new FormData();
		formData.append('file', evt.target.files[0]);
		console.log(evt.target.files[0]);
		evt.target.value = null;

		try {
			const uploadImage = await fetch(PUBLIC_BACKEND_BASE_URL + '/upload-mask', {
				method: 'POST',
				body: formData
			});
		} catch (error) {
			console.error(error);
		}
	}
	// making call to our backend openai api to generate edits
	export async function clickGenerateEdit(evt) {
		evt.preventDefault();

		const inputDetails = evt.target['input'].value;
		loading.set(true);

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/generate-edit', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ prompt: inputDetails })
		});
		const res = await resp.json();
		console.log(res);

		if (resp.status == 200) {
			loading.set(false);
			answer = res.text[0].url;
		} else {
			loading.set(false);
			if (res.error) {
				console.log('aiyo');
			}
		}
	}
</script>

<div>
	<label for="file">Upload Original Image</label>
	<input on:change={uploadOriImage} id="file" accept="image/*" type="file" />
</div>

<div>
	<label for="file">Upload Mask Image</label>
	<input on:change={uploadMaskImage} id="file" accept="image/*" type="file" />
</div>

<form on:submit={clickGenerateEdit} class="w-1/2 bg-white shadow-md rounded-lg p-8">
	<div class="mb-6">
		<label for="input" class="block text-gray-700 text-sm font-bold mb-2"> Get your edit </label>
		<input
			type="text"
			name="input"
			placeholder="Give your prompt"
			class="block w-full rounded-md py-2 px-3 border border-gray-300"
		/>
	</div>
	<div class="flex justify-end">
		<button
			class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
			type="submit"
		>
			Go!
		</button>
	</div>
</form>

<div>
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<img src={answer} alt="a picture" />
</div>
