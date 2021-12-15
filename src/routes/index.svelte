<script>
	import { session } from '$app/stores';
	import { onMount } from 'svelte';
	import 'dino-color-picker';
	import Icon from '../components/Icon.svelte';

	let color = '#f00';
	let pickerOpen = true;
	$: if (color) {
		console.log(color);
	}

	// updates when `color` updates, and checks that `colorPicker` is defined (after mount)
	$: rgbString = color && colorPicker && 'rgba(' + colorPicker.rgb.join(', ') + ')';
	$: hslString = color && colorPicker && 'hsla(' + colorPicker.hsl.join(', ') + ')';
	$: hexString = color && colorPicker && colorPicker.value;

	let colorPicker;

	onMount(() => {
		colorPicker = document.querySelector('dino-color-picker');
		colorPicker.value = color;
	});
</script>

<svelte:head>
	<title>{$session.languageDictionary.appName}</title>
</svelte:head>

<h1 class="text-center">{$session.languageDictionary.appName}</h1>

<div class="relative z-10">
	<button
		class="w-16 h-16 rounded"
		style="background: {color}"
		on:click|self={() => {
			pickerOpen = !pickerOpen;
		}}
	>
		<div class="absolute top-16">
			<dino-color-picker
				class="surface shadow-none {pickerOpen ? 'block' : 'hidden'}"
				on:change={(event) => {
					color = event.target.value;
				}}
			/>
		</div>
	</button>
</div>

<div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
	<div class="surface">
		<h3>RGB</h3>

		<div class="relative">
			<input class="surface w-full h-8" type="text" value={rgbString} />
			<button
				class="surface absolute inset-y-0 right-0 flex items-center hover:bg-gray-100 focus:bg-gray-100"
			>
				<Icon name="copy" class="w-6 h-6" />
			</button>
		</div>

		<input class="surface w-full h-8" type="text" value={hexString} />
		<input class="surface w-full h-8" type="text" value={hslString} />
	</div>
	<div class="surface">hi</div>
	<div class="surface">hi</div>
	<div class="surface">hi</div>
</div>

<style lang="postcss">
	/* .colormode {
		/* @apply surface; */
	/*	@apply border-2  border-gray-200 p-2 rounded;
	}*/
</style>
