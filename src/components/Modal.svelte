<script>
	// Note: copied from desktop clock and modified

	import { session } from '$app/stores';
	import Icon from './Icon.svelte';

	export let title;
	export let icon;

	let shown = false;
	export const show = () => (shown = true);
	export const hide = () => (shown = false);
	export const toggle = () => (shown = !shown);
</script>

<svelte:window
	on:keydown={(e) => {
		// TODO: only hide the topmost modal?
		if (e.key == 'Escape') {
			hide();
		}
	}}
/>

<div
	class="xs:p-3 sm:p-6 md:p-12 fixed left-0 top-0 w-full h-full bg-gray-300 bg-opacity-75 z-20 {shown
		? 'block'
		: 'hidden'}"
	on:click={() => hide()}
>
	<div
		class="modal-content flex flex-col h-full border-2 border-gray-300 bg-gray-100 p-2 xs:p-8 xs:pt-4 relative m-auto w-full md:w-3/4 bg-opacity-75"
		on:click|stopPropagation
	>
		<div class="mb-4 border-b-2 border-gray-300 pb-9">
			<button
				class="icon-btn z-30 float-right mt-2"
				on:click={() => hide()}
				aria-label={$session.languageDictionary.labels['Close']}
			>
				<Icon name="close" class="w-6 h-6" />
			</button>
			<h1 class="text-left mt-4"><Icon name={icon} class="w-6 h-6 inline mr-2" /> {title}</h1>
		</div>
		<div class="text-left relative flex-1 overflow-auto">
			<slot />
		</div>
	</div>
</div>

<style lang="postcss">
	.modal-content {
		animation: animateTop 0.25s;
		-webkit-animation: animateTop 0.25s;
	}

	@keyframes animateTop {
		from {
			top: -240px;
			opacity: 0;
		}
		to {
			top: 0;
			opacity: 1;
		}
	}
	@-webkit-keyframes animateTop {
		from {
			top: -240px;
			opacity: 0;
		}
		to {
			top: 0;
			opacity: 1;
		}
	}
</style>
