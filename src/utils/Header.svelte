<script>
	import { loggedIn } from '../stores/store';
	import { logOut } from './auth';
	import { goto } from '$app/navigation';
	import { getUserId } from './auth';
	// import { _totalPrompts } from '../routes/+layout.js'; // TESTING
	import { onMount } from 'svelte';
	// import { totalPrompts } from '../stores/store'; // NEW and NEW 2
	import { promptsRem } from '../stores/store';

	// let numberOfPromptsRemaining = 5; // TESTING

	// TESTING
	// async function updatePromptsRemaining() {
	// 	// Ensure _totalPrompts is available
	// 	if (_totalPrompts !== undefined) {
	// 		numberOfPromptsRemaining = Number(5 - _totalPrompts);
	// 	}
	// }

	// NEW
	let numberOfPromptsRemaining;
	$: {
		numberOfPromptsRemaining = $promptsRem;
	}

	promptsRem.subscribe((value) => {
		$promptsRem = value;
	});
	// NEW ENDS

	let logIO;
	loggedIn.subscribe((value) => {
		logIO = value;
	});

	function clickHome() {
		goto('/');
	}

	function clickGenerate() {
		goto('/');
	}

	function clickEdit() {
		goto('/edit');
	}

	function clickVariation() {
		goto('/variation');
	}

	function clickMyLibrary() {
		goto('/my-library');
	}

	async function clickLogin() {
		goto('/sign-in');
	}

	function clickSignUp() {
		goto('/sign-up');
	}

	function clickPayment() {
		goto('/payment');
	}

	// TESTING
	// // Call updatePromptsRemaining when _totalPrompts is updated
	// $: updatePromptsRemaining();

	// // This will update prompts remaining when the component is initially loaded
	// onMount(updatePromptsRemaining);
</script>

<main>
	<div class="bg-black text-white">
		<div class="container mx-auto flex justify-between items-center p-4">
			<button
				class="bg-black text-white p-3 rounded-full hover:bg-gray-900 focus:outline-none hover:shadow-indigo-600 hover:shadow-sm"
				on:click={clickHome}
			>
				<img
					src="https://images.websiteplanet.com/wp-content/uploads/2020/08/9-Best-Z-Logos-and-How-to-Make-Your-Own-for-Free-image1.png"
					alt="Home"
					class="w-8 h-7"
				/>
			</button>
			<div class="flex space-x-4">
				{#if logIO === true}
					<button
						class="text-white hover:text-indigo-600 focus:outline-none hover:shadow-indigo-600 hover:shadow-sm"
						on:click={clickGenerate}
					>
						Generate
					</button>
					<button
						class="text-white hover:text-indigo-600 focus:outline-none hover:shadow-indigo-600 hover:shadow-sm"
						on:click={clickEdit}
					>
						Edit
					</button>
					<button
						class="text-white hover:text-indigo-600 focus:outline-none hover:shadow-indigo-600 hover:shadow-sm"
						on:click={clickVariation}
					>
						Variation
					</button>
					<button
						class="text-white hover:text-indigo-600 focus:outline-none hover:shadow-indigo-600 hover:shadow-sm"
						on:click={clickMyLibrary}
					>
						My Library
					</button>

					<span class="hover:shadow-indigo-600 hover:shadow-sm hover:text-indigo-600"
						>{numberOfPromptsRemaining} prompts remaining</span
					>
					<button
						class="text-white hover:text-indigo-600 focus:outline-none hover:shadow-indigo-600 hover:shadow-sm"
						on:click={clickPayment}
					>
						Payment
					</button>
					<button
						class="text-white hover:text-indigo-600 focus:outline-none hover:shadow-indigo-600 hover:shadow-sm"
						on:click={logOut}
					>
						Log Out
					</button>
				{:else}
					<button
						class="text-white hover:text-indigo-600 focus:outline-none hover:shadow-indigo-600 hover:shadow-sm"
						on:click={clickLogin}
					>
						Log In
					</button>
					<button
						class="text-white hover:text-indigo-600 focus:outline-none hover:shadow-indigo-600 hover:shadow-sm"
						on:click={clickSignUp}
					>
						Sign Up
					</button>
				{/if}
			</div>
		</div>
	</div>
</main>
