<script>
	export let name;
	export let focusable = false;

	// https://heroicons.dev/
	const icons = [
		{
			name: 'close',
			svg: `<path stroke-linecap="square" stroke-linejoin="square" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>`
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
	{@html icon.svg}
</svg>
