<script>
	import { session } from '$app/stores';
	import { onMount } from 'svelte';

	import w3color from '../js/lib/w3color';

	import { settings } from '../components/settings';
	import { clickOutside } from '../components/clickOutside';
	import Icon from '../components/Icon.svelte';
	import CopyableInput from '../components/CopyableInput.svelte';
	import Range from '../components/Range.svelte';
	import { Toasts, addToast } from '../components/Toast/_toast.js';
	import { getUrlParam, setUrlParam, removeUrlParam } from '../components/urlParam.js';
	import Modal from '../components/Modal.svelte';
	import ColorList from '../components/ColorList.svelte';

	let c;
	$: isFavorite = favoritesList && favoritesList.contains($settings.color);

	let pageLoaded = false;
	let colorPicker;
	let pickerOpen = false;
	let selectedColorMode = 'RGB';

	let historyModal, favoritesModal;
	let historyList, favoritesList;

	$: if ($settings.color) {
		if (colorPicker) colorPicker.value = $settings.color;
		if (setColorProperty) setColorProperty($settings.color);
		if (pageLoaded) updateLink();
		if (historyList) historyList.add({ color: $settings.color, name: '' });
		if (pageLoaded) document.getElementById('auto-detect-input').value = '';

		c = w3color($settings.color);
		if ($settings.color.substring(8)) {
			c.opacity = Math.round((parseInt($settings.color.slice(-2), 16) / 255) * 100) / 100;
		} else {
			c.opacity = 1;
		}
	}

	let setColorProperty;

	$: rgbString = c.toRgbString();
	$: rgbaString = c.toRgbaString();
	$: cmykString = c.toCmykString();
	$: hslString = c.toHslString();
	$: hslaString = c.toHslaString();
	$: hwbString = c.toHwbString();
	$: hwbaString = c.toHwbaString();
	$: hexString = $settings.color.toLowerCase();

	$: red = c.red;
	$: green = c.green;
	$: blue = c.blue;

	$: cyan = Math.round(c.cyan * 100);
	$: magenta = Math.round(c.magenta * 100);
	$: yellow = Math.round(c.yellow * 100);
	$: key = Math.round(c.black * 100);

	$: hue = c.hue;
	$: saturation = Math.round(c.sat * 100);
	$: lightness = Math.round(c.lightness * 100);
	$: whiteness = Math.round(c.whiteness * 100);
	$: blackness = Math.round(c.blackness * 100);

	onMount(async () => {
		// https://kit.svelte.dev/faq
		await import('dino-color-picker');

		colorPicker = document.querySelector('dino-color-picker');

		setColorProperty = (color) => {
			document.documentElement.style.setProperty('--current-color', color);
			document.body.style.backgroundColor = color;
		};

		const c = getUrlParam('c');
		if (c) {
			// TODO: validation like in readColorString
			$settings.color = '#' + c;
		}

		historyList.set($settings.historyList);
		favoritesList.set($settings.favoritesList);

		pageLoaded = true;
	});

	const updateLink = () => {
		if ($settings.colorInUrl) {
			setUrlParam('c', $settings.color.replace('#', ''));
		} else {
			removeUrlParam();
		}
	};
	const copyLink = () => copyText(window.location.href);
	const copyText = (txt) => {
		navigator.clipboard.writeText(txt).then(
			() => {
				console.log('clipboard successfully set');
				addToast({ message: 'Copied', type: 'success', timeout: 3000 });
			},
			() => {
				console.log('clipboard write failed');
				addToast({ message: 'Failed to copy', type: 'info', timeout: 3000 });
			}
		);
	};

	const readColorString = (evt) => {
		setColorItem(evt.target.value);
	};

	function handleKeydown(event) {
		if (event.key === 'Escape') pickerOpen = false;
	}

	const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

	const setColorItem = (str) => {
		const newColor = w3color(str);
		if (newColor.valid) $settings.color = newColor.toHexString();
	};

	const setRgbItem = (evt) => {
		const val = parseInt(evt.target.value);
		const type = evt.target.dataset.type;
		const rgb = [
			type === 'red' ? val : red,
			type === 'green' ? val : green,
			type === 'blue' ? val : blue
		];
		setColorItem('rgb(' + rgb.join(', ') + ')');
	};

	const setCmykItem = (evt) => {
		const val = parseInt(evt.target.value);
		const type = evt.target.dataset.type;
		const cmyk = [
			type === 'cyan' ? val : cyan,
			type === 'magenta' ? val : magenta,
			type === 'yellow' ? val : yellow,
			type === 'key' ? val : key
		];
		setColorItem('cmyk(' + cmyk.join('%, ') + '%)');
	};

	const setHslItem = (evt) => {
		const val = parseInt(evt.target.value);
		const type = evt.target.dataset.type;
		const hsl = [
			type === 'hue' ? val : hue,
			type === 'saturation' ? val : saturation,
			type === 'lightness' ? val : lightness
		];
		setColorItem(`hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`);
	};
	const setHwbItem = (evt) => {
		const val = parseInt(evt.target.value);
		const type = evt.target.dataset.type;
		const hwb = [
			type === 'hue' ? val : hue,
			type === 'whiteness' ? val : whiteness,
			type === 'blackness' ? val : blackness
		];
		setColorItem(`hwb(${hwb[0]}, ${hwb[1]}%, ${hwb[2]}%)`);
	};
</script>

<svelte:head>
	<title>{$session.languageDictionary.appName}</title>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div class="grid grid-cols-1 md:grid-cols-3 gap-2">
	<div class="order-3 md:order-1 mx-auto md:mx-0">
		<input
			id="auto-detect-input"
			class="w-48 mr-4 mb-4 float-left"
			autofocus
			type="text"
			placeholder={$session.languageDictionary.messages['Type a color...']}
			on:change={readColorString}
			on:focus={(evt) => evt.target.select()}
		/>

		<button
			class="btn relative w-10 h-10 z-10 float-left"
			style="background: url(img/icons/icon.svg) 0.125rem 0.125rem / 2rem no-repeat white"
			on:click|self={() => {
				pickerOpen = !pickerOpen;
			}}
			use:clickOutside
			on:click_outside={() => (pickerOpen = false)}
		>
			<div class="absolute top-16">
				<dino-color-picker
					class="surface bg-white block transition-opacity {pickerOpen
						? 'opacity-100 visible'
						: 'opacity-0 hidden'}"
					on:change={(event) => {
						$settings.color = event.target.value;
					}}
					title="Color Picker"
				/>
			</div>
		</button>
	</div>
	<h1 class="order-1 md:order-2 text-center {c.isDark() ? 'text-white' : 'text-gray-900'}">
		{$session.languageDictionary.appName}
	</h1>
	<div class="order-2 md:order-3 mx-auto md:mx-0">
		<div class="float-right">
			<button
				class="btn mr-2 mb-2"
				on:click={() => {
					$settings.colorInUrl = !$settings.colorInUrl;
					updateLink();
					if ($settings.colorInUrl) copyLink();
				}}
			>
				<Icon name="link" class="inline w-4 h-4" />
				{$settings.colorInUrl ? 'Unlink' : 'Link'}
			</button>
			<button class="btn mr-2 mb-2" on:click={() => ($settings.color = '#000000')}>
				<Icon name="reset" class="inline w-4 h-4" />
				Reset
			</button>
			<button
				class="btn mb-2"
				on:click={() =>
					($settings.color =
						'#' +
						Math.floor(Math.random() * 0xffffff)
							.toString(16)
							.padStart(6, '0'))}
			>
				<Icon name="random" class="inline w-4 h-4" />
				Random
			</button>
		</div>
	</div>
</div>

<select class="md:hidden surface mx-auto block mt-4" bind:value={selectedColorMode}>
	{#each ['RGB', 'CMYK', 'HSL', 'HWB'] as colormode}
		<option value={colormode}>{colormode}</option>
	{/each}
</select>

<div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
	{#each ['RGB', 'CMYK', 'HSL', 'HWB'] as colormode, idx}
		<div class="colormode {selectedColorMode !== colormode ? 'hidden md:block' : ''}">
			<h3 class="text-center mb-4">{colormode}</h3>
			<div
				class="grid {colormode === 'CMYK'
					? 'grid-cols-1'
					: colormode === 'RGB'
					? 'lg:grid-cols-2 xl:grid-cols-3'
					: 'lg:grid-cols-2'} gap-2"
			>
				<CopyableInput
					class="mb-4"
					value={[rgbString, cmykString, hslString, hwbString][idx]}
					onChange={readColorString}
					{copyText}
				/>
				{#if colormode !== 'CMYK'}
					<CopyableInput
						class="mb-4"
						value={[rgbaString, null, hslaString, hwbaString][idx]}
						onChange={readColorString}
						{copyText}
					/>
				{/if}
				{#if colormode === 'RGB'}
					<CopyableInput
						class="mb-4 lg:col-span-2 xl:col-span-1"
						value={hexString}
						onChange={readColorString}
						{copyText}
					/>
				{/if}
			</div>
			<div class="grid {colormode === 'CMYK' ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-3'} gap-2">
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
<div class="h-16" />
<div class="grid grid-cols-3 py-4 w-full fixed bottom-0 -mx-8 bg-white bg-opacity-90">
	<button class="btn-circle w-12 h-12 mx-auto" on:click={historyModal.show} title="History">
		<Icon name="history" class="inline w-4 h-4" />
	</button>
	<button class="btn-circle w-12 h-12 mx-auto" on:click={favoritesModal.show} title="Saved">
		<Icon name="saved" class="inline w-4 h-4" />
	</button>
	<button
		class="btn-circle w-12 h-12 mx-auto"
		on:click={() => {
			favoritesList.add({ color: $settings.color, name: '' });
			$settings.color = $settings.color; // update `isFavorite`
		}}
		title="Favorite"
	>
		<Icon name="heart" class="inline w-4 h-4" fillColor={isFavorite ? $settings.color : 'none'} />
	</button>
</div>

<Modal bind:this={historyModal} title="History" icon="history">
	<ColorList
		bind:this={historyList}
		bind:items={$settings.historyList}
		modal={historyModal}
		{copyText}
	/>
</Modal>

<Modal bind:this={favoritesModal} title="Favorites" icon="heart">
	<ColorList
		bind:this={favoritesList}
		bind:items={$settings.favoritesList}
		modal={favoritesModal}
		{copyText}
	/>
</Modal>

<Toasts />

<style lang="postcss">
</style>
