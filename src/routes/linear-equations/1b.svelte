<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ fetch }) {
		const result = await fetch('/api/linear-equations/1b.json');
		const props = await result.json();
		// A(ax+b) = C(cx+d); ascending1; ascending2; level;
		return {
			props,
		};
	}
</script>

<script lang="ts">
	import { math, display } from '$lib/math';
	import { slide, fade } from 'svelte/transition';
	import FractionInput from '$lib/mathlive-inputs/FractionInput.svelte';
	import { Fraction, getRandomInt, Polynomial, Term, Expression } from 'mathlify';
	import { divisors } from './_utils';
	import { level0Working, level1aWorking, level1bWorking } from './_workings';
	import QnTaskbar from '$lib/QnTaskbar/index.svelte';
	import QnReview from '$lib/QnReview/index.svelte';

	// qn props
	export let a: number;
	export let b: number;
	export let c: number;
	export let d: number;
	export let A: number;
	export let C: number;
	export let lhs: boolean;
	export let level: number;

	// qn setup
	let { qn, answer, working } = generateQn(a, b, c, d, A, C, lhs);

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

	function generateNewVariables(level: number): [number, number, number, number, number, number, boolean] {
		const A = level === 0 ? 1 : getRandomInt(2, 9);
		const a = level === 0 ? getRandomInt(-9, 9, { avoid: [0, 1] }) * 10 : getRandomInt(-9, 9, { avoid: [0] }) * 10;
		const b = getRandomInt(-9, 9, { avoid: [0] });
		const x =
			level === 0 && Math.abs(a) <= 20 ? getRandomInt(-49, 49, { avoid: [0] }) : getRandomInt(-12, 12, { avoid: [0] });
		const AaMinusCc = level === 0 ? A * a : getRandomInt(-9, 9, { avoid: [0] }) * 10;
		const k = (x * AaMinusCc) / 10;
		const Cc = (A * a - AaMinusCc) / 10;
		const Cd = k + A * b;
		let C = 1;
		if (level === 1) {
			const divisors1 = divisors(Cd);
			const divisors2 = divisors(Cc);
			const commonDivisors = divisors1.filter((x) => divisors2.includes(x));
			if (commonDivisors.length > 1) {
				C = commonDivisors[getRandomInt(0, commonDivisors.length - 1)];
			}
		}
		const c = level === 0 ? 0 : (Cc / C) * 10;
		const d = Cd / C;
		return [a, b, c, d, A, C, getRandomInt(0, 1) === 0];
	}

	function generateQn(
		a: number,
		b: number,
		c: number,
		d: number,
		A: number,
		C: number,
		lhs: boolean,
	): { qn: string; answer: Fraction; working: string } {
		// set up
		const aX = new Term(a / 10, 'x');
		const aXPlusB = new Expression(aX, new Term(Math.sign(b), Math.abs(b / 10).toString()));
		const LHS = A === 1 ? aXPlusB : new Term(A, `(${aXPlusB})`);
		const cX = new Term(c / 10, 'x');
		const cXPlusD = new Expression(cX, new Term(Math.sign(d), Math.abs(d / 10).toString()));
		// qn
		let qnString: string;
		if (lhs || level === 0) {
			const RHS = C === 1 ? cXPlusD : new Term(C, `(${cXPlusD})`);
			qnString = `${LHS} = ${RHS}`;
		} else {
			const lhsExpression = new Expression(`${LHS}`, new Term(-C, `(${cXPlusD}) `));
			qnString = `${lhsExpression}=0`;
		}
		const qn = math(qnString);
		// answer
		const answer = new Fraction(C * d - A * b, A * a - C * c);
		// working
		const working =
			level === 0 ? level0Working(a, b, d) : lhs ? level1aWorking(a, b, c, d, A, C) : level1bWorking(a, b, c, d, A, C);
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
		<p class="text-center mb-0 max-w-prose">Solve the following equation.</p>
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
