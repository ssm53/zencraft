<script>
	import { goto } from '$app/navigation';
	import Header from '../../utils/Header.svelte';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	// import { delImageSuc, delImageFail } from '../../utils/alert.js';
	import Spinner from '../../spinner/spinner.svelte';
	import { loading } from '../../stores/store';
	import { getAccessTokenFromLocalStorage } from '../../utils/auth';
	import { genImages, varImages, editImages } from '../../stores/store';
	import { getUserId } from '../../utils/auth';

	export let data;

	let eImages = [];

	function clickMyGenerations() {
		editImages.set(false);
		varImages.set(false);
		genImages.set(true);
	}

	function clickMyVariations() {
		editImages.set(false);
		genImages.set(false);
		varImages.set(true);
	}

	export async function clickMyEdits() {
		varImages.set(false);
		genImages.set(false);
		editImages.set(true);

		const userId = getUserId();

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/my-edit-images/${userId}`, {
			method: 'GET'
		});

		const res = await resp.json();

		if (resp.status === 200) {
			console.log(res);
			eImages = res.myEditImages;
			return {
				eImages: res.myEditImages
			};
		} else {
			return {
				eImages: []
			};
		}
	}
</script>

<Spinner />

<div class="bg-gray-100">
	<div
		class="top-container flex flex-col justify-center items-center border-b-2 border-black bg-white h-44"
	>
		<div>
			<span class="font-bold text-3xl text-pink-700">My Library</span>
		</div>
		<div class="flex flex-row justify-between mt-5">
			<button
				on:click={clickMyGenerations}
				class="border-r-2 border-r-black border-b-2 border-b-white text-xl px-4 hover:border-b-2 hover:border-indigo-600"
				>My Generations</button
			>
			<button
				on:click={clickMyVariations}
				class="border-r-2 border-r-black border-b-2 border-b-white text-xl px-4 hover:border-b-2 hover:border-indigo-600"
				>My Variations</button
			>
			<button
				on:click={clickMyEdits}
				class="text-xl px-4 border-b-2 border-b-white hover:border-b-2 hover:border-indigo-600"
				>My Edits</button
			>
		</div>
	</div>

	<div class="main-container p-8">
		<p class="font-bold">
			Please note that these images will only last for 1hr from the time of generation. This is due
			to OpenAI's rules that imageURL's expire after one hour. If you want to save your image,
			please download it. Thanks!
		</p>
		{#if $genImages}
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{#each data.genImages as genI}
					<div class="bg-white shadow-lg p-4 rounded-lg">
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img src={genI.url} alt="my picture" class="w-full h-64 object-cover" />
						<p class="text-gray-700 mt-4 text-sm">{genI.prompt}</p>
						<div class="download-button flex justify-end mt-7">
							<a
								href={genI.url}
								download="your_image_filename.jpg"
								class="font-bold text-pink-700 border-2 px-3 py-3 border-pink-700 bg-gray-100 hover hover:bg-pink-700 hover:text-gray-100"
								target="_blank"
							>
								Download
							</a>
						</div>
					</div>
				{/each}
			</div>
		{:else if $varImages}
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{#each data.varImages as varI}
					<div class="bg-white shadow-lg p-4 rounded-lg">
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img src={varI.url} alt="my picture" class="w-full h-64 object-cover" />
						<div class="download-button flex justify-end mt-7">
							<a
								href={varI.url}
								download="your_image_filename.jpg"
								class="font-bold text-pink-700 border-2 px-3 py-3 border-pink-700 bg-gray-100 hover hover:bg-pink-700 hover:text-gray-100"
								target="_blank"
							>
								Download
							</a>
						</div>
					</div>
				{/each}
			</div>
		{:else if $editImages}
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{#each eImages as editI}
					<div class="bg-white shadow-lg p-4 rounded-lg">
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img src={editI.url} alt="my picture" class="w-full h-64 object-cover" />
						<p class="text-gray-700 mt-4 text-sm">{editI.prompt}</p>
						<div class="download-button flex justify-end mt-7">
							<a
								href={editI.url}
								download="your_image_filename.jpg"
								class="font-bold text-pink-700 border-2 px-3 py-3 border-pink-700 bg-gray-100 hover hover:bg-pink-700 hover:text-gray-100"
								target="_blank"
							>
								Download
							</a>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<p>nothing</p>
		{/if}
	</div>
</div>
