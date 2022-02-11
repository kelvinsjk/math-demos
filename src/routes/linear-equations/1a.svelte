<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ fetch }) {
		const result = await fetch('/api/linear-equations/1a.json');
		const { a, b, ascending1, ascending2, level } = await result.json();
		return {
			props: {
				aParams: a,
				bParams: b,
				ascending1,
				ascending2,
				level,
			},
		};
	}
</script>

<script lang="ts">
	import { math, display } from '$lib/math';
	import { slide, fade } from 'svelte/transition';
	import FractionInput from '$lib/mathlive-inputs/FractionInput.svelte';
	import { Fraction, getRandomInt, Polynomial, Term, Expression } from 'mathlify';
	import QnTaskbar from '$lib/QnTaskbar/index.svelte';
	import QnReview from '$lib/QnReview/index.svelte';

	// qn props
	export let aParams: [number, number];
	export let bParams: [number, number];
	export let ascending1: boolean;
	export let ascending2: boolean;
	export let level: number;

	// qn setup
	let poly1 = new Polynomial(aParams).changeAscending(ascending1);
	let poly2 = new Polynomial(bParams).changeAscending(ascending2);
	let { qn, answer, working } = generateQn(poly1, poly2, ...aParams, ...bParams);

	// mode and score setup
	let randomMode = true;
	let score = 0;
	let marks: number;

	// setup for qn state
	let attempt: Fraction = undefined;
	let invalid: boolean = undefined;
	let simplified: boolean = undefined;
	let submitted = false;
	let disabled = false;

	// setup for choice of level
	const options = [math('\\bigstar'), math('\\bigstar \\bigstar')];
	let selectedIndex = level;
	$: level = selectedIndex;

	function generateNewVariables(level: number): [Polynomial, Polynomial, number, number, number, number] {
		const avoid = level === 0 ? [0, 1] : [0];
		const a: [number, number] = [getRandomInt(-9, 9, { avoid }), getRandomInt(-9, 9, { avoid: [0] })];
		const b: [number, number] = [
			level === 0 ? 0 : getRandomInt(-9, 9, { avoid: [0, a[0]] }),
			getRandomInt(-9, 9, { avoid: [0] }),
		];
		const poly1 = new Polynomial(a).changeAscending(getRandomInt(0, 1) === 0);
		const poly2 = new Polynomial(b).changeAscending(getRandomInt(0, 1) === 1);
		return [poly1, poly2, ...a, ...b];
	}

	function generateQn(
		poly1: Polynomial,
		poly2: Polynomial,
		a: number,
		b: number,
		c: number,
		d: number,
	): { qn: string; answer: Fraction; working: string } {
		// qn
		const qnString = `${poly1} = ${poly2}`;
		const qn = math(qnString);
		// answer
		const answer = new Fraction(d - b, a - c);
		// working
		const aX = new Term(a, 'x');
		const lhs1 = c === 0 ? `${aX}` : new Expression(aX, new Term(-c, 'x ')).toString();
		const rhs1 = new Expression(d, new Term(Math.sign(-b), `${Math.abs(-b)}`));
		const lhs2 = new Term(a - c, 'x');
		const lastLine = a - c === 1 ? '' : `x &= ${answer}`;
		const working = display(`\\begin{align*}
			${poly1} &= ${poly2} \\\\
			${lhs1} &= ${rhs1} \\\\
			${lhs2} &= ${d - b} \\\\
			${lastLine}
		\\end{align*}`);
		return { qn, answer, working };
	}

	function newQn(): void {
		// generate variables
		if (randomMode) {
			selectedIndex = getRandomInt(0, 1);
			level = selectedIndex;
		}
		const variables = generateNewVariables(level);
		// update qn
		({ qn, answer, working } = generateQn(...variables));
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
	<title>Linear Equations</title>
</svelte:head>

<article class="prose flex-center">
	<h1 class="mt-8 text-center">Linear Equations</h1>
	<QnTaskbar on:newQn={newQn} {options} bind:randomMode bind:selectedIndex {score} />
	<section
		id="question-container"
		class="question-container flex-center full-bleed px-2"
		class:correct={marks === 2}
		class:partial={marks === 1}
		class:wrong={marks === 0}
	>
		<h2 class="mt-0">Question</h2>
		<p class="text-center mb-0 max-w-prose">Solve the equation, leaving your answer in the simplest form.</p>
		<div class="qn max-w-prose flex-center p-4 gap-4">
			<div id="qn-text" class="flex flex-col h-16 -mb-10">
				{#key qn}
					<div transition:slide|local class="self-center">
						{@html qn}
					</div>
				{/key}
			</div>
			<div id="answer-input" class="flex items-center h-16">
				<div>
					{@html math('x = ')}
				</div>
				<FractionInput
					bind:value={attempt}
					bind:invalid
					bind:simplified
					{disabled}
					on:enter={() => {
						if (!invalid && !disabled) {
							checkAnswer();
						}
					}}
				/>
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
		</div>
	</section>
	<QnReview {marks} {submitted} {working} />
</article>
