<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
	import '../katex.min.css';
	import '../mathlive-fonts.css';
</script>

<Header />
<main class="bg-stone-100">
	<slot />
</main>
<footer>Footer</footer>

<style>
	main {
		min-height: 100vh;
		max-width: 100vw;
	}
	footer {
		min-height: 50vw;
		background: midnightblue;
	}
</style>
