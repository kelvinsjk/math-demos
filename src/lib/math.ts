import katex from 'katex';

/**
 * inline math
 *
 * @param displayOptions defaults to `{noLineBreak: true}`
 */
export function math(x: string, displayOptions?: DisplayOptions): string {
	const defaultOptions = { noLineBreak: true };
	const compiledOptions = { ...defaultOptions, ...displayOptions };
	const options = { throwOnError: false };
	const xStr = compiledOptions.noLineBreak ? `{${x}}` : x;
	return katex.renderToString(xStr, options);
}

interface DisplayOptions {
	noLineBreak?: boolean;
}

/**
 * display math
 */
export function display(x: string): string {
	const options = { throwOnError: false, displayMode: true };
	return katex.renderToString(x, options);
}

// /**
//  * flush left display math
//  *
//  */
// function flDisplay(x: string): string {
// 	const options = { throwOnError: false, displayMode: true, fleqn: true };
// 	return `<div style="overflow-x: auto;">${katex.renderToString(x, options)}</div>`;
// }
//
// /**
//  * display math with overflow: hidden
//  *
//  */
// function displayNoScroll(x: string): string {
// 	const options = { throwOnError: false, displayMode: true };
// 	return `<div style="overflow-x: hidden;">${katex.renderToString(x, options)}</div>`;
// }
