<script>
	// todo keyboard, local storage?
	// handle local storage through settings where component is used
	// will use this componen t twice, one for history and one for favs
	// basically an array of items with crud opperations, plus rendering and editing and opening colors

	// future: add sorting by date and display date options

	import Icon from './Icon.svelte';

	export let items = [];

	// export const set = (newItems) => {
	// 	items = newItems;
	// };

	const remove = (timestamp) => {
		items = items.filter((item) => item.timestamp != timestamp);
	};

	// todo: dont add duplicate items, check if prev item matches current
	export const add = (item) => {
		items = items.concat({
			...item,
			timestamp: Date.now()
		});
	};
	const removeAll = () => (items = []);
</script>

{#if items && items.length > 0}
	<p>{items.length} items</p>
	<button on:click={removeAll}>remove all</button>
	<div>
		{#each items as item, idx (item.timestamp)}
			<div class="surface grid grid-cols-2 md:grid-cols-4 gap-2">
				<div>
					<div class="w-8 h-8 rounded" style="background-color: {item.color}" />
					<span>{item.color}</span>
				</div>
				<div>
					<p>{item.name}</p>
				</div>
				<div>
					<button>open</button>
					<button>edit</button>
					<button>move</button>
					<button class="btn">
						<Icon name="heart" class="inline w-4 h-4" />
					</button>
				</div>
				<button on:click={() => remove(item.timestamp)}>x</button>
			</div>
		{/each}
	</div>
{/if}

<style lang="postcss">
</style>
