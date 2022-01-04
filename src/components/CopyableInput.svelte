<script>
	import Icon from './Icon.svelte';

	export let value;
	export let onChange;
	export let copyText;

	let input;
</script>

<div class="relative {$$props.class ?? ''}">
	<input
		bind:this={input}
		spellcheck="false"
		class="w-full"
		type="text"
		{value}
		on:change={onChange}
	/>
	<button
		on:click={() => {
			const str = input.value;
			input.focus();
			input.setSelectionRange(0, str.length);

			copyText(str);
		}}
		class="btn absolute inset-y-0 right-0 flex items-center"
		title="Copy"
	>
		<Icon name="copy" class="w-6 h-6" />
	</button>
</div>
