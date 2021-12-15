<script>
	export let name;
	export let focusable = false;

	// https://heroicons.dev/
	const icons = [
		{
			name: 'close',
			path: `M6 18L18 6M6 6l12 12`
		},
		{
			name: 'copy',
			path: `M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z`
		}
	];

	$: icon = icons.find((i) => i.name === name);
</script>

<svg
	class={$$props.class ?? ''}
	{focusable}
	stroke="currentColor"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	viewBox={icon.viewbox ?? '0 0 24 24'}
>
	<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icon.path} />
</svg>
