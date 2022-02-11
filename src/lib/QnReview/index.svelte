<script lang="ts">
	import { slide, fade } from 'svelte/transition';
	export let marks: number;
	export let submitted: boolean;
	export let working: string;
</script>

{#if submitted}
	<section id="qn-review-solution" class="flex-center" transition:slide|local>
		<h2>Review</h2>
		<section id="review-container">
			{#if marks === 2}
				✅ ✅ Correct! Well done!
			{:else if marks === 1}
				✅ ❌ While numerically correct, we should further simplify our answer to the simplest form.
			{:else}
				❌ Incorrect. Try again!
			{/if}
		</section>

		<h2>Solution</h2>
		<section id="solution-container">
			{@html working}
		</section>
	</section>
{/if}
