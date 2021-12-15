<script>
	import Icon from './Icon.svelte';

	export let value;
	export let onChange;
</script>

<div class="relative {$$props.class ?? ''}">
	<input class="surface w-full h-8" type="text" {value} on:change={onChange} />
	<button
		class="surface absolute inset-y-0 right-0 flex items-center hover:bg-gray-100 focus:bg-gray-100"
	>
		<Icon name="copy" class="w-6 h-6" />
	</button>
</div>
