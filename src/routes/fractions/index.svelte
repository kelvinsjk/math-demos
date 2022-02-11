<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ fetch }) {
		const result = await fetch('/api/randomFractions.json');
		const { a, b, mode } = await result.json();
		return {
			props: {
				aParams: a,
				bParams: b,
				mode,
			},
		};
	}
</script>

<script lang="ts">
	import { math, display } from '$lib/math';
	import { slide, fade } from 'svelte/transition';
	import FractionInput from '$lib/mathlive-inputs/FractionInput.svelte';
	import { Fraction, getRandomFrac, getRandomInt } from 'mathlify';
	import { plusMinusWorking, multiplyWorking, divideWorking } from './_workings';
	import QnTaskbar from '$lib/QnTaskbar/index.svelte';
	import QnReview from '$lib/QnReview/index.svelte';

	// qn props
	export let aParams: [number, number];
	export let bParams: [number, number];
	export let mode: string;

	// qn setup
	let a = new Fraction(...aParams).abs();
	let b = new Fraction(...bParams).abs();
	let { qn, answer, working } = generateQn(a, b, mode);

	// mode and score set up
	let randomMode = true;
	let score = 0;
	let marks: number;

	// setup for qn state
	let attempt: Fraction = undefined;
	let invalid: boolean = undefined;
	let simplified: boolean = undefined;
	let submitted = false;
	let disabled = false;

	// setup for choice of mode
	const options = [math('+'), math('-'), math('\\times'), math('\\div')];
	const modes = ['plus', 'minus', 'times', 'divide'];
	let selectedIndex = modes.indexOf(mode);
	$: mode = updateMode(selectedIndex);
	function updateMode(selectedIndex: number): string {
		return modes[selectedIndex];
	}

	function generateNewVariables(): [Fraction, Fraction] {
		let a = getRandomFrac({ avoid: [0] }).abs();
		let b = getRandomFrac({ avoid: [0] }).abs();
		while (a.isInteger() && b.isInteger()) {
			a = getRandomFrac({ avoid: [0] }).abs();
			b = getRandomFrac({ avoid: [0] }).abs();
		}
		return [a, b];
	}

	function generateQn(a: Fraction, b: Fraction, mode: string): { qn: string; answer: Fraction; working: string } {
		// for subtraction, take bigger minus smaller
		if (mode === 'minus') {
			[a, b] = a.isGreaterThan(b) ? [a, b] : [b, a];
		} else if (mode === 'times' && (a.isEqualTo(1) || b.isEqualTo(1))) {
			a = getRandomFrac({ avoid: [0, 1] }).abs();
			b = getRandomFrac({ avoid: [0, 1] }).abs();
		} else if (mode === 'divide' && b.isEqualTo(1)) {
			b = getRandomFrac({ avoid: [0, 1] }).abs();
		}
		// qn
		const signs = { plus: '+', minus: '-', times: '\\times', divide: '\\div' };
		const sign = signs[mode];
		const qnString = `\\displaystyle ${a} ${sign} ${b} =`;
		const qn = math(qnString);
		// answer
		const answer = a[mode](b) as Fraction;
		// working
		let working: string;
		if (mode === 'plus' || mode === 'minus') {
			working = plusMinusWorking(a, b, sign, answer);
		} else if (mode === 'times') {
			const workingString = multiplyWorking(a, b, sign, answer);
			working = display(`\\begin{align*} ${workingString} \\end{align*}`);
		} else {
			if (mode !== 'divide') {
				console.log(`warning: invalid ${mode} detected`);
			}
			const workingString = divideWorking(a, b, sign, answer);
			working = display(`\\begin{align*} ${workingString} \\end{align*}`);
		}
		return { qn, answer, working };
	}

	function newQn(): void {
		// generate variables
		[a, b] = generateNewVariables();
		const modes = ['plus', 'minus', 'times', 'divide'];
		if (randomMode) {
			selectedIndex = getRandomInt(0, 3);
			mode = modes[selectedIndex];
		}
		// update qn
		({ qn, answer, working } = generateQn(a, b, mode));
		// reset qn
		[attempt, simplified, marks, invalid, submitted, disabled] = [undefined, undefined, undefined, true, false, false];
	}

	function checkAnswer(): void {
		submitted = true;
		disabled = true;
		if (attempt.isEqualTo(answer)) {
			marks = simplified ? 2 : 1;
			score += marks;
		} else {
			marks = 0;
		}
	}
</script>

<svelte:head>
	<title>Fraction Arithmetic</title>
</svelte:head>

<article class="prose flex-center">
	<h1 class="mt-8 text-center">Fraction Arithmetic</h1>
	<QnTaskbar on:newQn={newQn} {options} bind:randomMode bind:selectedIndex {score} />
	<section
		id="question-container"
		class="question-container flex-center full-bleed px-2"
		class:correct={marks === 2}
		class:partial={marks === 1}
		class:wrong={marks === 0}
	>
		<h2 class="mt-0">Question</h2>
		<p class="text-center mb-0 max-w-prose">Evaluate the above, leaving your answer in the simplest form.</p>
		<div class="qn max-w-prose">
			<div class="flex items-center overflow-hidden h-16">
				<div>
					{#key qn}
						<div transition:slide|local>
							{@html qn}
						</div>
					{/key}
				</div>
			</div>
			<FractionInput bind:value={attempt} bind:invalid bind:simplified {disabled} pure />
			<div id="submit-button" class="flex-center">
				{#if !submitted}
					<button
						class="btn btn-primary"
						disabled={invalid || attempt === undefined || disabled}
						on:click={checkAnswer}
					>
						Submit
					</button>
				{:else}
					<button in:fade|local={{ duration: 1000 }} class="btn btn-primary" on:click={newQn}> New Question </button>
				{/if}
			</div>
		</div>
	</section>
	<QnReview {marks} {submitted} {working} />
</article>

<style>
	.qn {
		display: grid;
		grid-template-columns: 4.5rem 4.5rem 6rem;
		align-items: center;
		padding: 1em;
	}
</style>
