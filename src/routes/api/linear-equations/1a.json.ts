import { getRandomInt } from 'mathlify';

// two pairs of integers a, b
// level = 0/1
// if level == 0, then a[0] is not 0/1, b[0] is not 0, and the others are non-zero
// if level == 1, then all integers are non-zero and a[0] !== b[0]
export async function get(): Promise<{
	body: { a: [number, number]; b: [number, number]; ascending1: boolean; ascending2: boolean; level: number };
}> {
	const level = getRandomInt(0, 1);
	const avoid = level === 0 ? [0, 1] : [0];
	const a: [number, number] = [getRandomInt(-9, 9, { avoid }), getRandomInt(-9, 9, { avoid: [0] })];
	const b: [number, number] = [
		level === 0 ? 0 : getRandomInt(-9, 9, { avoid: [0, a[0]] }),
		getRandomInt(-9, 9, { avoid: [0] }),
	];
	return {
		body: {
			a,
			b,
			ascending1: getRandomInt(0, 1) === 1,
			ascending2: getRandomInt(0, 1) === 1,
			level,
		},
	};
}
