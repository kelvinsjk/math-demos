import { getRandomInt, Fraction } from 'mathlify';

// 2 non-zero fractions, a and b, of which at least one is not an integer.
// mode = plus/minus/times/divide
// if mode === times/divide then a and b are not 1 as well
export async function get(): Promise<{ body: { a: [number, number]; b: [number, number], mode: string } }> {
	const modes = ['plus', 'minus', 'times', 'divide'];
	const a: [number, number] = [getRandomInt(-9, 9, {avoid:[0]}), getRandomInt(-9, 9, {avoid:[0]})];
	const b: [number, number] = [getRandomInt(-9, 9, {avoid:[0]}), getRandomInt(-9, 9, {avoid:[0]})];
	let aFrac = new Fraction(...a);
	let bFrac = new Fraction(...b);
	// avoid both integers
	while (aFrac.isInteger() && bFrac.isInteger()) {
		a[0] = getRandomInt(-9, 9, {avoid:[0]});
		a[1] = getRandomInt(-9, 9, {avoid:[0]});
		b[0] = getRandomInt(-9, 9, {avoid:[0]});
		b[1] = getRandomInt(-9, 9, {avoid:[0]});
		aFrac = new Fraction(...a);
		bFrac = new Fraction(...b);
	}
	const mode = modes[getRandomInt(0,3)]
	// avoid '1' for multiplication/division
	while ( (mode==='times' && (aFrac.isEqualTo(1) || bFrac.isEqualTo(1))) || (mode==='divide' && bFrac.isEqualTo(1)) || (aFrac.isInteger() && bFrac.isInteger())) {
		a[0] = getRandomInt(-9, 9, {avoid:[0]});
		a[1] = getRandomInt(-9, 9, {avoid:[0]});
		b[0] = getRandomInt(-9, 9, {avoid:[0]});
		b[1] = getRandomInt(-9, 9, {avoid:[0]});
		bFrac = new Fraction(...b);
		aFrac = new Fraction(...a);
	}
	return {
		body: {
			a,
			b,
			mode
		},
	};
}
