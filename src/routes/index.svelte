<script>
	import { session } from '$app/stores';
	import { onMount } from 'svelte';
	import 'dino-color-picker';
	import Icon from '../components/Icon.svelte';
	import CopyableInput from '../components/CopyableInput.svelte';

	import w3color from '../js/lib/w3color';

	let color = '#000';

	let pickerOpen = true;

	$: if (color) {
		console.log(color);
	}

	// updates when `color` updates
	$: rgbString = color && w3color(color).toRgbString();
	$: hslString = color && w3color(color).toHslString();
	$: hwbString = color && w3color(color).toHwbString();
	$: cmykString = color && w3color(color).toCmykString();

	$: hexString = color;

	$: red = color && w3color(color).red;

	let colorPicker;

	onMount(() => {
		colorPicker = document.querySelector('dino-color-picker');
		colorPicker.value = color;
	});

	const readColorString = (evt) => {
		const str = evt.target.value;
		let c = w3color(str);
		if (!c.valid) return; // todo toast saying invalid color
		color = c.toHexString();
		colorPicker.value = color;
	};

	function handleKeydown(event) {
		if (event.key === 'Escape') pickerOpen = false;
	}
</script>

<svelte:head>
	<title>{$session.languageDictionary.appName}</title>
	<script src="https://www.w3schools.com/lib/w3color.js"></script>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<h1 class="text-center">{$session.languageDictionary.appName}</h1>

<div class="relative z-10">
	<input
		id="auto-detect-input"
		autofocus
		type="text"
		class="surface"
		placeholder={$session.languageDictionary.messages['Type a color...']}
		on:change={readColorString}
		on:focus={(evt) => evt.target.select()}
	/>
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
					document.getElementById('auto-detect-input').value = '';
				}}
			/>
		</div>
	</button>
</div>

<div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
	<div class="surface">
		<h3>RGB</h3>

		<CopyableInput value={rgbString} onChange={readColorString} />

		<input class="surface w-full h-8" type="text" on:change={readColorString} value={hexString} />
		<input class="surface w-full h-8" type="text" on:change={setRedString} value={red} />
	</div>
	<div class="surface">
		<input class="surface w-full h-8" type="text" on:change={readColorString} value={hslString} />
		<input class="surface w-full h-8" type="text" on:change={readColorString} value={hwbString} />
		<input class="surface w-full h-8" type="text" on:change={readColorString} value={cmykString} />
	</div>
	<div class="surface">hi</div>
	<div class="surface">hi</div>
</div>

<style lang="postcss">
	/* .colormode {
		/* @apply surface; */
	/*	@apply border-2  border-gray-200 p-2 rounded;
	}*/
</style>
