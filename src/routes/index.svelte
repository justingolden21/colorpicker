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
	// $: rgbString =
	// 	color && w3color && w3color(color).valid && 'rgba(' + w3color(color).toRgb().join(', ') + ')';
	$: rgbString = color && colorPicker && 'rgba(' + colorPicker.rgb.join(', ') + ')';
	$: hslString = color && colorPicker && 'hsla(' + colorPicker.hsl.join(', ') + ')';
	$: hexString = color && colorPicker && colorPicker.value;

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
		let c = w3color(str);
		if (!c.valid) return;

		const rgb = c.toRgb();
		color = rgbToHex(rgb);

		console.log(c.toRgb());
		console.log(c.toCmyk());
		console.log(c.toHsl());
		console.log(c.toHwb());

		// let cmyk = c.toCmyk();
		// cmyk.c = Math.round(cmyk.c*100);
		// cmyk.m = Math.round(cmyk.m*100);
		// cmyk.y = Math.round(cmyk.y*100);
		// cmyk.k = Math.round(cmyk.k*100);
		// setCMYK(cmyk);

		// let hsl = c.toHsl();
		// hsl.s = Math.round(hsl.s*100);
		// hsl.l = Math.round(hsl.l*100);
		// setHSL(hsl);

		// let hsv = HWBtoHSV(c.toHwb() );
		// hsv.s = Math.round(hsv.s*100);
		// hsv.v = Math.round(hsv.v*100);
		// setHSV(hsv);
	};
</script>

<svelte:head>
	<title>{$session.languageDictionary.appName}</title>

	<script src="https://www.w3schools.com/lib/w3color.js"></script>
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
