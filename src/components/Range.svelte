<script>
	export let value, min, max, dataType, onChange;
</script>

<div class="w-full">
	<input
		type="range"
		{value}
		{min}
		{max}
		data-type={dataType}
		on:change={onChange}
		class="slider {$$props.class ?? ''}"
	/>
</div>

<style lang="postcss">
	.slider {
		@apply appearance-none w-full h-2 rounded-full borders opacity-75 transition-opacity hover:opacity-100;
	}

	/* bad UX to possibly make slider thumb white? unable to add border to thumb... */

	.slider::-webkit-slider-thumb {
		@apply appearance-none w-5 h-5 rounded-full cursor-pointer;
		background-color: var(--current-color);
	}

	.slider::-moz-range-thumb {
		@apply appearance-none w-5 h-5 rounded-full cursor-pointer;
		background-color: var(--current-color);
	}
</style>
