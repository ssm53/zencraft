<script>
	import { goto } from '$app/navigation';

	function clickTryAgain() {
		goto('/payment');
	}
</script>

<div class="main-container flex flex-col justify-center items-center">
	<p class="mt-10 text-2xl font-bold text-red-700">Your payment did not go through</p>
	<button
		on:click={clickTryAgain}
		class=" mt-10 border-4 bg-gray-100 border-pink-700 text-pink-700 px-3 py-3 hover hover:bg-pink-700 hover:text-white"
		>Try again?</button
	>
</div>
