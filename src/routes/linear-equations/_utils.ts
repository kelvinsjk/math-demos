  // divisors from 2 to 9
  export function divisors(x:number): number[] {
    const divisors = []
    x = Math.abs(x);
    for (let i = 2; i <= Math.max(9,x); i++) {
      if (x % i === 0) {
        divisors.push(i)
      }
    }
    return divisors
  }