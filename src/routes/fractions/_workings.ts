	import {display} from '../../lib/math';
  import {gcd, Fraction} from 'mathlify';
  
  export function plusMinusWorking(a: Fraction, b: Fraction, sign: string, answer: Fraction): string {
		const lcm = Math.abs(a.den * b.den) / gcd(a.den, b.den);
		const aPrime = `\\frac{ ${(a.num * lcm) / a.den} }{ ${lcm} }`;
		const bPrime = `\\frac{ ${(b.num * lcm) / b.den} }{ ${lcm} }`;
		const combined =
			sign === '+'
				? `\\frac{${(a.num * lcm) / a.den + (b.num * lcm) / b.den}}{${lcm}}`
				: `\\frac{${(a.num * lcm) / a.den - (b.num * lcm) / b.den}}{${lcm}}`;
		const secondStep = a.den === b.den ? `${combined}` : `${aPrime} ${sign} ${bPrime} \\\\ &= ${combined}`;
		const working = display(`\\begin{align*}
				${a} ${sign} ${b} &= ${secondStep}
				${lcm === answer.den ? '' : `\\\\ &= ${answer}`}
			\\end{align*}`);
		return working;
	}

	export function multiplyWorking(a: Fraction, b: Fraction, sign: string, answer: Fraction, divisionMode = false): string {
		const steps: string[] = [];
		// change integers to fractions
		if (a.isInteger() || b.isInteger()) {
			steps.push(`\\frac{${a.num}}{${a.den}} \\times \\frac{${b.num}}{${b.den}}`);
		}
		// cross cancellation
		const gcd1 = gcd(a.num, b.den);
		const gcd2 = gcd(b.num, a.den);
		if (gcd1 !== 1 || gcd2 !== 1) {
			steps.push(`\\frac{${a.num / gcd1}}{${a.den / gcd2}} \\times \\frac{${b.num / gcd2}}{${b.den / gcd1}}`);
		}
		// multiply across
		const newNum = (a.num * b.num) / gcd1 / gcd2;
		const newDen = (a.den * b.den) / gcd1 / gcd2;
		steps.push(`\\frac{${newNum}}{${newDen}}`);
		// final answer
		if (newDen !== answer.den) {
			steps.push(`${answer}`);
		}
		let working = `${a} \\times ${b} `;
		steps.forEach((step, i) => {
			if (i !== 0 || divisionMode) {
				working += '\\\\ ';
			}
			working += `&= ${step}`;
		});
		return working;
	}

	export function divideWorking(a: Fraction, b: Fraction, sign: string, answer: Fraction): string {
		const bReciprocal = b.reciprocal();
		return `${a} ${sign} ${b} &=` + multiplyWorking(a, bReciprocal, '\\times', answer, true);
	}