<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { loading } from '../../stores/store';
	import { goto } from '$app/navigation';
	import Spinner from '../../spinner/spinner.svelte';

	export function clickArt() {
		goto('/art');
	}

	let answer = '';

	async function handleSubmit(e) {
		e.preventDefault();

		const inputDetails = e.target['input'].value;
		loading.set(true);

		try {
			const resp = await fetch(`${PUBLIC_BACKEND_BASE_URL}` + '/get-answer', {
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
				answer = res.text;
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

<div class="container">
	<h1>Give Any Instruction</h1>
	<form on:submit={handleSubmit} class="w-1/2 bg-white shadow-md rounded-lg p-8">
		<div class="mb-6">
			<label for="input" class="block text-gray-700 text-sm font-bold mb-2">
				Tell me what you want
			</label>
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

	<div class="answer-area font-black">{answer}</div>

	<div>
		<button>Text</button>
		<button on:click={clickArt}>Art</button>
	</div>
</div>
