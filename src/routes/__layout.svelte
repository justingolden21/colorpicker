<script>
	import '../app.postcss';
	import { session } from '$app/stores';
</script>

<svelte:head>
	<meta name="title" content={$session.languageDictionary['appName']} />
	<meta name="description" content={$session.languageDictionary['appDescription']} />
	<meta name="keywords" content={$session.languageDictionary['appKeywords']} />

	<!-- TODO: replace app URL -->

	<meta property="og:image:height" content="292" />
	<meta property="og:image:width" content="558" />
	<meta property="og:description" content={$session.languageDictionary['appDescription']} />
	<meta property="og:title" content={$session.languageDictionary['appName']} />
	<!-- <meta property="og:url" content="APP URL" /> -->
	<meta property="og:image" content="img/icons/og-image.jpg" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={$session.languageDictionary['appName']} />

	<meta name="twitter:title" content={$session.languageDictionary['appName']} />
	<meta name="twitter:description" content={$session.languageDictionary['appDescription']} />
	<!-- <meta property="twitter:url" content="APP URL" /> -->

	<meta name="apple-mobile-web-app-status-bar" content="#FFFFFF" />
	<meta name="theme-color" content="#FFFFFF" />
	<meta name="msapplication-TileColor" content="#FFFFFF" />
	<link rel="mask-icon" href="img/icons/safari-pinned-tab.svg" color="#FFFFFF" />
</svelte:head>

<slot />
