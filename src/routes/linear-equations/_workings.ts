  import {display} from '../../lib/math';
  import {Term, Expression} from 'mathlify';
  
  export function level0Working(a: number, b: number, d: number): string {
    const aX = new Term(a/10, 'x');
    const aXPlusB = new Expression(aX, new Term(Math.sign(b), Math.abs(b/10).toString()))
    const working = display(`\\begin{align*}
				${aXPlusB} &= ${d/10} \\\\
        ${aX} &= ${d/10} ${b > 0 ? '-' : '+'} ${Math.abs(b/10)} \\\\
        ${aX} &= ${(d-b)/10} \\\\
				x &= ${(d-b)/a}
			\\end{align*}`);
		return working;
  }

  export function level1aWorking(a: number, b: number, c: number, d: number, A: number, C: number): string {
    // step 1
    const aX = new Term(a/10, 'x');
    const aXPlusB = new Expression(aX, new Term(Math.sign(b), Math.abs(b/10).toString()))
    const cX = new Term(c/10, 'x');
    const cXPlusD = new Expression(cX, new Term(Math.sign(d), Math.abs(d/10).toString()))
		const LHS = A === 1 ? aXPlusB : new Term(A, `(${aXPlusB})`);
		const RHS = C === 1 ? cXPlusD : new Term(C, `(${cXPlusD})`);
    // step 2
    const aAX = new Term(A*a/10, 'x');
    const aAXPlusAB = new Expression(aAX, new Term(Math.sign(b*A/10), Math.abs(b*A/10).toString()));
    const cCX = new Term(c*C/10, 'x');
    const cCXPlusD = new Expression(cCX, new Term(Math.sign(d*C), Math.abs(d*C/10).toString()))
    // step 3
    const aAXMinusCCX = new Expression(aAX, new Term(-c*C/10, 'x '));
    const step3RHS = new Expression(`${C*d/10}`, new Term(Math.sign(A*b*-1), `${Math.abs(A*b/10)} `));
    // step 4
    const step4LHS = new Term((A*a-C*c)/10, 'x');
    // step 5
    const step5 = ((A*a-C*c)/10===1) ? '' : `x &= ${(C*d-A*b)/(A*a-C*c)}`;
    const working = display(`\\begin{align*}
				${LHS} &= ${RHS} \\\\
				${aAXPlusAB} &= ${cCXPlusD} \\\\
				${aAXMinusCCX} &= ${step3RHS} \\\\
        ${step4LHS} &= ${(C*d-A*b)/10} \\\\
        ${step5}
			\\end{align*}`);
		return working;
  }

  export function level1bWorking(a: number, b: number, c: number, d: number, A: number, C: number): string {
    // step 1
    const aX = new Term(a/10, 'x');
    const aXPlusB = new Expression(aX, new Term(Math.sign(b), Math.abs(b/10).toString()))
    const cX = new Term(c/10, 'x');
    const cXPlusD = new Expression(cX, new Term(Math.sign(d), Math.abs(d/10).toString()))
		const LHSFirstTerm = A === 1 ? aXPlusB : new Term(A, `(${aXPlusB})`);
		const LHSExpression = new Expression(`${LHSFirstTerm}`, new Term(-C, `(${cXPlusD}) `));
    // step 2
    const aAX = new Term(A*a/10, 'x');
    const cCX = new Term(-c*C/10, 'x ');
    const step2LHS = new Expression(aAX, new Term(Math.sign(b*A/10), Math.abs(b*A/10).toString()), cCX, new Term(Math.sign(-d*C), `${Math.abs(d*C/10)} `));
    // step 3
    const step3XTerm = new Term((A*a-C*c)/10, 'x');
    const step3LHS = new Expression(step3XTerm, new Term(Math.sign(A*b-C*d), `${Math.abs((A*b-C*d)/10)} `));
    // step 5
    const step5 = ((A*a-C*c)/10===1) ? '' : `x &= ${(C*d-A*b)/(A*a-C*c)}`;
    const working = display(`\\begin{align*}
				${LHSExpression} &= 0 \\\\
				${step2LHS} &= 0 \\\\
				${step3LHS} &= 0 \\\\
        ${step3XTerm} &= ${(C*d-A*b)/10} \\\\
        ${step5}
			\\end{align*}`);
		return working;
  }