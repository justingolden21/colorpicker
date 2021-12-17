<script>
	import { session } from '$app/stores';
	import { onMount } from 'svelte';

	import w3color from '../js/lib/w3color';

	import { settings } from '../components/settings';
	import { clickOutside } from '../components/clickOutside';
	import Icon from '../components/Icon.svelte';
	import CopyableInput from '../components/CopyableInput.svelte';
	import Range from '../components/Range.svelte';

	let color = $settings.color || '#000000';
	let colorPicker;
	let pickerOpen = true;

	$: if (color) {
		$settings.color = color;
	}

	// updates when `color` updates
	$: rgbString = w3color(color).toRgbString();
	$: cmykString = w3color(color).toCmykString();
	$: hslString = w3color(color).toHslString();
	$: hwbString = w3color(color).toHwbString();
	$: hexString = color;

	$: red = w3color(color).red;
	$: green = w3color(color).green;
	$: blue = w3color(color).blue;

	$: cyan = Math.round(w3color(color).cyan * 100);
	$: magenta = Math.round(w3color(color).magenta * 100);
	$: yellow = Math.round(w3color(color).yellow * 100);
	$: key = Math.round(w3color(color).black * 100);

	$: hue = w3color(color).hue;
	$: saturation = Math.round(w3color(color).sat * 100);
	$: lightness = Math.round(w3color(color).lightness * 100);
	$: whiteness = Math.round(w3color(color).whiteness * 100);
	$: blackness = Math.round(w3color(color).blackness * 100);

	onMount(async () => {
		// https://kit.svelte.dev/faq
		await import('dino-color-picker');

		colorPicker = document.querySelector('dino-color-picker');
		colorPicker.value = color;
	});

	const readColorString = (evt) => {
		const str = evt.target.value;
		const c = w3color(str);
		if (!c.valid) return; // TODO toast saying invalid color
		color = c.toHexString();
		colorPicker.value = color;
	};

	function handleKeydown(event) {
		if (event.key === 'Escape') pickerOpen = false;
	}

	const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

	// TODO
	const setColorItem = (str) => {
		const c = w3color(str);
		if (!c.valid) return;
		color = c.toHexString();
		colorPicker.value = color;
	};

	const setRgbItem = (evt) => {
		const str = evt.target.value;
		const type = evt.target.dataset.type;
		const rgb = [
			type === 'red' ? parseInt(str) : w3color(color).red,
			type === 'green' ? parseInt(str) : w3color(color).green,
			type === 'blue' ? parseInt(str) : w3color(color).blue
		];
		setColorItem('rgb(' + rgb.join(', ') + ')');
	};

	const setCmykItem = (evt) => {
		const str = evt.target.value;
		const type = evt.target.dataset.type;
		const cmyk = [
			type === 'cyan' ? parseInt(str) : w3color(color).cyan,
			type === 'magenta' ? parseInt(str) : w3color(color).magenta,
			type === 'yellow' ? parseInt(str) : w3color(color).yellow,
			type === 'key' ? parseInt(str) : w3color(color).black
		];
		setColorItem('cmyk(' + cmyk.join('%, ') + '%)');
	};

	const setHslItem = () => {};
	const setHwbItem = () => {};
</script>

<svelte:head>
	<title>{$session.languageDictionary.appName}</title>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />
<div class="grid grid-cols-1 md:grid-cols-3 gap-2">
	<div class="flex items-start">
		<input
			id="auto-detect-input"
			class="w-48"
			autofocus
			type="text"
			placeholder={$session.languageDictionary.messages['Type a color...']}
			on:change={readColorString}
			on:focus={(evt) => evt.target.select()}
		/>

		<!-- style="background:url('img/icons/icon{w3color(color).isDark()
            ? '-white'
            : ''}.svg'); background-color: {color};" -->

		<button
			class="btn relative w-10 h-10 rounded ml-4 z-10"
			style="background-color: {color}"
			on:click|self={() => {
				pickerOpen = !pickerOpen;
			}}
			use:clickOutside
			on:click_outside={() => (pickerOpen = false)}
		>
			<div class="absolute top-16">
				<dino-color-picker
					class="surface shadow-none bg-white block transition-opacity {pickerOpen
						? 'opacity-100 visible'
						: 'opacity-0 hidden'}"
					on:change={(event) => {
						color = event.target.value;
						document.getElementById('auto-detect-input').value = '';
					}}
				/>
			</div>
		</button>
	</div>
	<h1 class="text-center">{$session.languageDictionary.appName}</h1>
	<div class="mx-auto">
		<button class="btn mr-2 mb-2">
			<Icon name="link" class="inline w-4 h-4" />
			Link
		</button>
		<button class="btn mr-2 mb-2" on:click={() => (color = '#000000')}>
			<Icon name="reset" class="inline w-4 h-4" />
			Reset
		</button>
		<button
			class="btn mr-2 mb-2"
			on:click={() =>
				(color = '#' + Math.floor(Math.random() * 0xffffff).toString(16)).padStart(6, '0')}
		>
			<Icon name="random" class="inline w-4 h-4" />
			Random
		</button>
	</div>
</div>

<div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
	{#each ['RGB', 'CMYK', 'HSL', 'HWB'] as colormode, idx}
		<div class="colormode">
			<h3 class="text-center mb-4">{colormode}</h3>
			<div class="{colormode === 'RGB' ? 'grid grid-cols-1 sm:grid-cols-2 gap-2' : ''} mb-4">
				<CopyableInput
					class="mr-1"
					value={[rgbString, cmykString, hslString, hwbString][idx]}
					onChange={readColorString}
				/>
				{#if colormode === 'RGB'}
					<CopyableInput class="ml-1" value={hexString} onChange={readColorString} />
				{/if}
			</div>
			<div class="grid {colormode === 'CMYK' ? 'grid-cols-2' : 'grid-cols-3'} gap-2">
				{#each [['red', 'green', 'blue'], ['cyan', 'magenta', 'yellow', 'key'], ['hue', 'saturation', 'lightness'], ['hue', 'whiteness', 'blackness']][idx] as type, idx2}
					<div class={idx === 0 ? 'ml-4' : ''}>
						<label for="{type}-input">{capitalize(type)}:</label>
						<Range
							class="hidden sm:block mt-4"
							min="0"
							max={[
								['255', '255', '255'],
								['100', '100', '100', '100'],
								['360', '100', '100'],
								['360', '100', '100']
							][idx][idx2]}
							dataType={type}
							onChange={[setRgbItem, setCmykItem, setHslItem, setHwbItem][idx]}
							value={[
								[red, green, blue],
								[cyan, magenta, yellow, key],
								[hue, saturation, lightness],
								[hue, whiteness, blackness]
							][idx][idx2]}
						/>
						<input
							id="{type}-input"
							class="w-full mt-2 sm:mt-4"
							type="number"
							min="0"
							max={[
								['255', '255', '255'],
								['100', '100', '100', '100'],
								['360', '100', '100'],
								['360', '100', '100']
							][idx][idx2]}
							data-type={type}
							on:change={[setRgbItem, setCmykItem, setHslItem, setHwbItem][idx]}
							value={[
								[red, green, blue],
								[cyan, magenta, yellow, key],
								[hue, saturation, lightness],
								[hue, whiteness, blackness]
							][idx][idx2]}
						/>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>
<div class="grid grid-cols-3 fixed bottom-0 w-full my-4 -mx-8">
	<button class="btn rounded-full w-12 h-12 mx-auto">
		<Icon name="saved" class="inline w-4 h-4" />
	</button>
	<button class="btn rounded-full w-12 h-12 mx-auto">
		<Icon name="history" class="inline w-4 h-4" />
	</button>
	<button class="btn rounded-full w-12 h-12 mx-auto">
		<Icon name="heart" class="inline w-4 h-4" />
	</button>
</div>

<style lang="postcss">
	.colormode {
		@apply surface p-4;
	}
	input[type='text'],
	input[type='number'] {
		@apply surface h-10;
	}
</style>
