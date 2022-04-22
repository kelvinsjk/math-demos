<script lang="ts">
	import { math } from '$lib/math';
	import { slide } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { tick } from 'svelte';

	let showXVal = false;
	let initial = true;

	let a: HTMLElement, b: HTMLElement, c: HTMLElement, d: HTMLElement, e: HTMLElement;
	let elements = [a, b, c, d, e];
	let x = math('x');
	let buttonText = 'show answer';

	const solnItems = [
		{ content: math('3'), classes: '', visible: true },
		{
			content: '',
			classes: 'relative px-px text-red-600',
			visible: true,
			child: true,
		},
		{ content: math('-2'), classes: '', visible: true },
		{
			content: math(' =15-2'),
			classes: 'pl-1',
			visible: false,
		},
		{
			content: math(' =13'),
			classes: 'pl-1',
			visible: false,
		},
	];

	async function clickButton() {
		if (!showXVal) {
			x = math('\\phantom{(}x\\phantom{)}');
			initial = false;
			await tick();
			showXVal = true;
			setTimeout(() => {
				solnItems[3].visible = true;
				setTimeout(() => {
					solnItems[4].visible = true;
					setTimeout(() => {
						buttonText = 'reset';
					}, 800);
				}, 800);
			}, 800);
		} else {
			x = math('x');
			showXVal = false;
			solnItems[3].visible = false;
			solnItems[4].visible = false;
			buttonText = 'show answer';
		}
	}
</script>

<svelte:head>
	<title>Substituting Values</title>
</svelte:head>

<article class="prose flex-center">
	<h1 class="mt-8 text-center">Substituting Values</h1>
	<section id="example-container" class="question-container flex-center full-bleed px-2">
		<h2 class="mt-0">Example</h2>
		<p class="text-center max-w-prose">
			Evaluate {@html math('3x-2')} when {@html math('x=5')}
		</p>
	</section>

	<section id="solution-container" class="example-container flex-center full-bleed px-2">
		<h2 class="mt-0">Solution</h2>
		<p class="text-center max-w-prose">
			We replace <span class="text-red-600">{@html math('x')}</span> with
			<span class="text-red-600">{@html math('5')}</span> and evaluate the result
		</p>
		<button
			class="btn btn-primary btn-sm mb-5 transition-all duration-500 whitespace-nowrap"
			style:width={buttonText === 'show answer' ? '10em' : '5em'}
			on:click={clickButton}>{buttonText}</button
		>
		<div class="flex border text-center max-w-prose">
			{#each solnItems.filter((e) => e.visible) as item, i (item)}
				<div animate:flip class={item.classes} in:slide|local={{ duration: 700 }}>
					{@html item.content}
					{#if item['child']}
						<div style:opacity={showXVal ? 0 : 100} class="transition duration-700">
							{@html x}
						</div>
						{#if !initial}
							<div
								class="absolute text-center text-red-600 bg-blue-300/50 transition  duration-700 top-0 inset-x-0 mx-auto w-fit px-px rounded-full"
								style:transform={showXVal ? null : 'translateY(-2em)'}
								style:opacity={showXVal ? 100 : 0}
								bind:this={elements[i]}
							>
								{@html math('(5)')}
							</div>
						{/if}
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<a class="px-4 my-2 self-end bg-orange-300" rel="prefetch" href="./01-exercise"> Try out an exercise >> </a>
</article>
