<script>
	import { session } from '$app/stores';
	import Icon from '../components/Icon.svelte';

	// import Pickr from '@simonwep/pickr';

	// import '@simonwep/pickr/dist/themes/classic.min.css'; // 'classic' theme
	// import '@simonwep/pickr/dist/themes/monolith.min.css'; // 'monolith' theme
	// import '@simonwep/pickr/dist/themes/nano.min.css'; // 'nano' theme

	import { onMount } from 'svelte';

	onMount(() => {
		// const pickr = Pickr.create({
		// 	el: '.color-picker',
		// 	theme: 'classic', // or 'monolith', or 'nano'
		// 	swatches: [],
		// 	components: {
		// 		// Main components
		// 		preview: true,
		// 		opacity: true,
		// 		hue: true,
		// 		// Input / output Options
		// 		interaction: {
		// 			// hex: true,
		// 			// rgba: true,
		// 			// hsla: true,
		// 			// hsva: true,
		// 			// cmyk: true,
		// 			input: true,
		// 			clear: true,
		// 			save: true
		// 		}
		// 	}
		// });
		// console.log(pickr.hsva);
		// console.log(hsva);
	});
</script>

<svelte:head>
	<title>{$session.languageDictionary.appName}</title>
</svelte:head>

<h1 class="text-center">{$session.languageDictionary.appName}</h1>

<!-- <div class="color-picker" /> -->
<div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
	<div class="surface">
		<!-- <h3>RGB</h3> -->

		<div class="relative">
			<input class="surface w-full h-8" type="text" value="rgb(0, 0, 0)" />
			<button
				class="surface absolute inset-y-0 right-0 flex items-center hover:bg-gray-100 focus:bg-gray-100"
			>
				<Icon name="copy" class="w-6 h-6" />
			</button>
		</div>
	</div>
	<div class="surface">hi</div>
	<div class="surface">hi</div>
	<div class="surface">hi</div>
</div>

<!-- <style lang="postcss">
	.colormode {
		/* @apply surface; */
		@apply border-2  border-gray-200 p-2 rounded;
	}
</style> -->
