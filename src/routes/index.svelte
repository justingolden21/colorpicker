<script>
	import { session } from '$app/stores';
	import { onMount } from 'svelte';
	import 'dino-color-picker';
	import Icon from '../components/Icon.svelte';
	import CopyableInput from '../components/CopyableInput.svelte';

	import w3color from '../js/lib/w3color';

	let color = '#000000';

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
	$: green = color && w3color(color).green;
	$: blue = color && w3color(color).blue;

	let colorPicker;

	onMount(() => {
		colorPicker = document.querySelector('dino-color-picker');
		colorPicker.value = color;
	});

	const readColorString = (evt) => {
		const str = evt.target.value;
		const c = w3color(str);
		if (!c.valid) return; // todo toast saying invalid color
		color = c.toHexString();
		colorPicker.value = color;
	};

	function handleKeydown(event) {
		if (event.key === 'Escape') pickerOpen = false;
	}

	const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

	const setRgbItem = (evt) => {
		const str = evt.target.value;
		const type = evt.target.dataset.type;
		const rgb = [
			type === 'red' ? parseInt(str) : w3color(color).red,
			type === 'green' ? parseInt(str) : w3color(color).green,
			type === 'blue' ? parseInt(str) : w3color(color).blue
		];
		const c = w3color('rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')');
		if (!c.valid) return;
		color = c.toHexString();
		colorPicker.value = color;
	};
</script>

<svelte:head>
	<title>{$session.languageDictionary.appName}</title>
	<script src="https://www.w3schools.com/lib/w3color.js"></script>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div class="grid grid-cols-1 md:grid-cols-3 gap-2">
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
					class="surface shadow-none bg-white {pickerOpen ? 'block' : 'hidden'}"
					on:change={(event) => {
						color = event.target.value;
						document.getElementById('auto-detect-input').value = '';
					}}
				/>
			</div>
		</button>
	</div>
	<h1 class="text-center">{$session.languageDictionary.appName}</h1>
	<div>
		<button class="surface">
			<Icon name="link" class="inline w-4 h-4" />
			Link
		</button>
		<button class="surface">
			<Icon name="reset" class="inline w-4 h-4" />
			Reset
		</button>
		<button class="surface">
			<Icon name="random" class="inline w-4 h-4" />
			Random
		</button>
	</div>
</div>

<div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
	<div class="surface">
		<h3>RGB</h3>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
			<CopyableInput value={rgbString} onChange={readColorString} />
			<CopyableInput value={hexString} onChange={readColorString} />
		</div>

		<div class="grid grid-cols-3 gap-2">
			{#each ['red', 'green', 'blue'] as type}
				<div>
					<label for="{type}-input">{capitalize(type)}:</label>
					<input
						min="0"
						max="255"
						data-type={type}
						class="hidden sm:block"
						type="range"
						on:change={setRgbItem}
						value={type == 'red' ? red : type == 'green' ? green : blue}
					/>
					<input
						id="{type}-input"
						data-type={type}
						class="surface w-full h-8"
						type="number"
						on:change={setRgbItem}
						value={type == 'red' ? red : type == 'green' ? green : blue}
					/>
				</div>
			{/each}
		</div>
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
