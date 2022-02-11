<script lang="ts">
	import { slide } from 'svelte/transition';
	export let score = 0;
</script>

<aside id="score" class="flex-center">
	<h3 class="my-0">Score</h3>
	<div class="h-14">
		{#key score}
			<div class="stat-value flex border p-2 justify-center" transition:slide|local>
				{score}
			</div>
		{/key}
	</div>
</aside>
