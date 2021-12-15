<script>
	import { session } from '$app/stores';
</script>

<svelte:head>
	<title>{$session.languageDictionary.appName}</title>
</svelte:head>

<h1 class="text-center">{$session.languageDictionary.appName}</h1>
<p class="mt-4 text-left">Hello World</p>
