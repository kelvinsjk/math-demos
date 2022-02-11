<script lang="ts">
	import Options from './Options.svelte';
	import Score from './Score.svelte';

	export let options: string[];
	export let randomMode: boolean;
	export let selectedIndex: number;
	export let score: number;
</script>

<section id="overlay" class="flex flex-row justify-center">
	<Options on:newQn {options} bind:randomMode bind:selectedIndex />
	<div class="divider divider-vertical mx-2" />
	<Score {score} />
</section>
