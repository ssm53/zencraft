<div class="top-container flex flex-col justify-center items-center border-b-2 border-black">
	<div>
		<span class="font-bold text-lg text-pink-700">My Library</span>
	</div>
	<div class="flex flex-row justify-between">
		<button class="border-r-2 border-black">My Generations</button>
		<button class="border-r-2 border-black">My Variations</button>
		<button>My Edits</button>
	</div>
</div>

<div class="main-container">
	<div>
		{#each data.genImages as gen}
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src={gen.url} alt="my picture" />
			<p>{gen.prompt}</p>
			<p>{gen.userId}</p>
		{/each}
	</div>
</div>