<script>
	import Icon from './Icon.svelte';

	export let value;
	export let onChange;

	let input;
</script>

<div class="relative {$$props.class ?? ''}">
	<input
		bind:this={input}
		spellcheck="false"
		class="surface w-full h-8"
		type="text"
		{value}
		on:change={onChange}
	/>
	<button
		on:click={() => {
			const str = input.value;
			input.focus();
			input.setSelectionRange(0, str.length);

			navigator.clipboard.writeText(str).then(
				() => {
					console.log('clipboard successfully set');
				},
				() => {
					console.log('clipboard write failed');
				}
			);
		}}
		class="surface absolute inset-y-0 right-0 flex items-center hover:bg-gray-100 focus:bg-gray-100"
	>
		<Icon name="copy" class="w-6 h-6" />
	</button>
</div>
