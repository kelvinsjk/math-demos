<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Counter from '$lib/Counter.svelte';

	import { math } from '$lib/math';
	import FractionInput from '$lib/mathlive-inputs/FractionInput.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section class="flex flex-col justify-center items-center gap-4 py-4">
	<a class="btn btn-primary" sveltekit:prefetch href="./fractions">Fraction Arithmetic</a>
	<a class="btn btn-primary" sveltekit:prefetch href="./linear-equations/1a">Linear Equations 1A</a>
	<a class="btn btn-primary" sveltekit:prefetch href="./linear-equations/1b">Linear Equations 1B</a>

	<p>
		{@html math('2x+3,y')} x
	</p>

	<FractionInput />
</section>
