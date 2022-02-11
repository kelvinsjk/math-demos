import { getRandomInt } from 'mathlify';

// six integers a,b,c,d,A,C
// lhs: boolean, level: 0/1
// b is a non-zero integer from -9 to 9
// if level==0, then A=C=1, c=0, a is a multiple of 10 that is not 0/10
// if level==1, then A is between 2 and 9, a is a non-zero multiple of 10, C/c are generated to guarantee a 'nice' solution
// d is also generated to give us a solution with 1 decimal place
export async function get(): Promise<{
	body: { a: number; b: number; c: number; d: number; A: number; C: number; lhs: boolean; level: number };
}> {
	const level = getRandomInt(0, 1);
  // A(ax+b) = C(cx+d)
  // (Aa-Cc)x = Cd-Ab = k
	const A = level===0 ? 1 : getRandomInt(2, 9);
  const a = level===0 ? getRandomInt(-9, 9, { avoid: [0, 1] })*10 : getRandomInt(-9, 9, { avoid: [0] })*10;
  const b =  getRandomInt(-9, 9, { avoid: [0] });
  const x =
			level === 0 && Math.abs(a) <= 20 ? getRandomInt(-49, 49, { avoid: [0] }) : getRandomInt(-12, 12, { avoid: [0] });
  const AaMinusCc = level===0 ? A*a : getRandomInt(-9,9, {avoid:[0]})*10;
  const k = x*AaMinusCc/10;
  const Cc = (A*a-AaMinusCc)/10
  const Cd = k + A*b;
  let C = 1;
  let c = 0;
  if (level===1){
    const divisors1 = divisors(Cd);
    const divisors2 = divisors(Cc);
    const commonDivisors = divisors1.filter(x => divisors2.includes(x));
    if (commonDivisors.length > 1){
      C = commonDivisors[getRandomInt(0, commonDivisors.length-1)];
    }
    c = Cc/C*10;
  }
  const d = Cd/C;
	return {
		body: {
			a,
			b,
      c,
      d,
      A,
      C,
      lhs: getRandomInt(0,1)===0,
      level,
		},
	};
}

  // divisors from 2 to 9
  function divisors(x:number): number[] {
    const divisors = []
    x = Math.abs(x);
    for (let i = 2; i <= Math.max(9,x); i++) {
      if (x % i === 0) {
        divisors.push(i)
      }
    }
    return divisors
  }