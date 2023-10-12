<script>
	import { loggedIn } from '../stores/store';
	import { logOut } from './auth';
	import { goto } from '$app/navigation';

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

	function clickMyImages() {
		goto('/my-images');
	}

	async function clickLogin() {
		goto('/sign-in');
	}

	function clickSignUp() {
		goto('/sign-up');
	}
</script>

<main>
	<div class="bg-black text-white">
		<div class="container mx-auto flex justify-between items-center p-4">
			<button
				class="bg-black text-white p-3 rounded-full hover:bg-gray-900 focus:outline-none"
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
						class="text-white hover:text-indigo-600 focus:outline-none"
						on:click={clickGenerate}
					>
						Generate
					</button>
					<button class="text-white hover:text-indigo-600 focus:outline-none" on:click={clickEdit}>
						Edit
					</button>
					<button
						class="text-white hover:text-indigo-600 focus:outline-none"
						on:click={clickVariation}
					>
						Variation
					</button>
					<button
						class="text-white hover:text-indigo-600 focus:outline-none"
						on:click={clickMyImages}
					>
						My Images
					</button>

					<span> 50 prompts remaining</span>
					<button class="text-white hover:text-indigo-600 focus:outline-none" on:click={logOut}>
						Log Out
					</button>
				{:else}
					<button class="text-white hover:text-indigo-600 focus:outline-none" on:click={clickLogin}>
						Log In
					</button>
					<button
						class="text-white hover:text-indigo-600 focus:outline-none"
						on:click={clickSignUp}
					>
						Sign Up
					</button>
				{/if}
			</div>
		</div>
	</div>
</main>
