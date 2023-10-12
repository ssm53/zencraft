<script>
	import Spinner from '../spinner/spinner.svelte';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { loading } from '../stores/store';
	import { goto } from '$app/navigation';

	let answer = '';

	async function handleSubmit(e) {
		e.preventDefault();

		const inputDetails = e.target['input'].value;
		loading.set(true);

		try {
			const resp = await fetch(`${PUBLIC_BACKEND_BASE_URL}` + '/get-art', {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ prompt: inputDetails })
			});
			if (resp.status === 200) {
				loading.set(false);
				const res = await resp.json();
				console.log(res);
				answer = res.text[0].url;
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
				<span class=" mr-12 ml-5 mt-4">Describe your creation in detail</span>
				<button class=" ml-8 bg-gray-100 mt-4 px-2 py-2 text-sm">Surprise me</button>
			</div>
			<form on:submit={handleSubmit} class=" bg-white shadow-md rounded-lg p-8">
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
				<div class="flex justify-end">
					<button
						class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
						type="submit"
					>
						Go!
					</button>
				</div>
			</form>
		</div>

		<div class="size-box flex flex-col w-5/6 bg-white mt-10">
			<p class=" font-bold ml-5">Pick your size</p>
			<div class=" size-choice flex flex-col items-center mt-5">
				<button class=" bg-pink-700 w-1/2 px-3 py-3 rounded-md text-white mb-5">256 x 256</button>
				<button class=" bg-pink-700 w-1/2 px-3 py-3 rounded-md text-white mb-5">512 x 512</button>
				<button class=" bg-pink-700 w-1/2 px-3 py-3 rounded-md text-white mb-5">
					1024 x 1024</button
				>
			</div>
		</div>

		<!-- <div class="answer-area font-black">{answer}</div> -->
	</div>
	<div class="r-container w-3/5 flex justify-center items-center">
		<!-- svelte-ignore a11y-img-redundant-alt -->
		<img src="/src/images/grid-image.jpeg" alt="grid picture" />
		<!-- svelte-ignore a11y-img-redundant-alt -->
		<img src={answer} alt="a picture" />
	</div>
</div>
