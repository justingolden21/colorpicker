<script>
	import { session } from '$app/stores';
	import { onMount } from 'svelte';
	import 'dino-color-picker';
	import Color from 'color';
	import Icon from '../components/Icon.svelte';

	// color
	let color = '#f00';

	let pickerOpen = true;

	$: if (color) {
		console.log(color);
	}

	const thingy = Color('rgb(255, 255, 255)');
	console.log(thingy);

	// updates when `color` updates, and checks that `colorPicker` is defined (after mount)
	$: rgbString = color && Color && Color(color).rgb().string();
	$: hslString = color && Color && Color(color).hsl().string();
	$: hexString = color;

	let colorPicker;

	onMount(() => {
		colorPicker = document.querySelector('dino-color-picker');
		colorPicker.value = color;
	});

	function rgbToHex({ r, g, b }) {
		r = r.toString(16);
		g = g.toString(16);
		b = b.toString(16);
		r = r.length == 1 ? '0' + r : r;
		g = g.length == 1 ? '0' + g : g;
		b = b.length == 1 ? '0' + b : b;

		return ('#' + r + g + b).toUpperCase();
	}

	function randInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	const readColorString = (str) => {
		color = Color(str).hex();
	};
</script>

<svelte:head>
	<title>{$session.languageDictionary.appName}</title>
</svelte:head>

<h1 class="text-center">{$session.languageDictionary.appName}</h1>

<div class="relative z-10">
	<input autofocus type="text" class="surface" on:change={(e) => readColorString(e.target.value)} />
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
