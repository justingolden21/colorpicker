<script>
	export let name;
	export let focusable = false;
	export let fillColor = 'none';

	// https://heroicons.dev/
	const icons = [
		{
			name: 'close',
			path: `M6 18L18 6M6 6l12 12`
		},
		{
			name: 'copy',
			path: `M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z`
		},
		{
			name: 'link',
			path: `M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1`
		},
		{
			name: 'reset',
			path: `M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15`
		},
		{
			// "shuffle" iconsvg.xyz
			name: 'random',
			path: `M16 3h5v5M4 20L20.2 3.8M21 16v5h-5M15 15l5.1 5.1M4 4l5 5`
		},
		{
			name: 'history',
			path: `M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z`
		},
		{
			name: 'heart',
			path: `M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z`
		},
		{
			name: 'saved',
			path: `M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z`
		},
		{
			name: 'success',
			path: `M5 13l4 4L19 7`
		},
		{
			name: 'info',
			path: `M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z`
		}
	];

	$: icon = icons.find((i) => i.name === name);
</script>

<svg
	class={$$props.class ?? ''}
	{focusable}
	stroke="currentColor"
	fill={fillColor}
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	viewBox={icon.viewbox ?? '0 0 24 24'}
>
	<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icon.path} />
</svg>
