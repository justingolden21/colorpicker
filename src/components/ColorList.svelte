<script>
	// todo keyboard, local storage?
	// handle local storage through settings where component is used
	// will use this componen t twice, one for history and one for favs
	// basically an array of items with crud opperations, plus rendering and editing and opening colors

	export let items = [];

	// export const setItems = () => {};

	const remove = (timestamp) => {
		items = items.filter((item) => item.timestamp != timestamp);
	};
	export const add = (item) => {
		items = items.concat({
			...item,
			timestamp: Date.now()
		});
	};
	const removeAll = () => (items = []);
</script>

{#if items.length > 0}
	<p>{items.length} items</p>
	<div>
		{#each items as item, idx (item.timestamp)}
			<p>{item.color}</p>
			{#if item.name}
				<p>{item.name}</p>
			{/if}
			<p>{item.timestamp}</p>
			<button on:click={() => remove(item.timestamp)}>x</button>
		{/each}
		<button on:click={removeAll}>remove all</button>
	</div>
{/if}

<style lang="postcss">
</style>
