export const fractionLayer = {
	fraction: `
      <div class='rows'>
        <ul>
          <li class='keycap tex' style='color:black'>7</li>
          <li class='separator w5'></li>
          <li class='keycap tex' style='color:black'>8</li>
          <li class='separator w5'></li>
          <li class='keycap tex' style='color:black'>9</li>
          <li class='separator w5'></li>
          <li class='action font-glyph' data-alt-keys='delete' data-command='["deleteBackward"]' style='color:black; font-size: 1.5em'>&#x232b;</li>
          <li class='separator'></li>

          <li class='action font-glyph' data-alt-keys='delete' data-command='["deleteAll"]'style='color:red; font-weight: 600; font-size: 2.0em'>&#8557;</li>
        </ul>
        <ul>
          <li class='keycap tex' style='color:black'>4</li>
          <li class='separator w5'></li>
          <li class='keycap tex' style='color:black'>5</li>
          <li class='separator w5'></li>
          <li class='keycap tex' style='color:black'>6</li>
          <li class='separator w5'></li>
          <li class='action' style='color:blue; font-size:1em;' data-insert='\\frac{#?}{#0}'></li>
          <li class='separator'></li>
          <li class='action font-glyph' data-alt-keys='delete' data-command='["deleteForward"]' style='color:black; font-size: 1.5em; font-weight:600'>del</li>
        </ul>
        <ul>
          <li class='keycap tex' style='color:black'>1</li>
          <li class='separator w5'></li>
          <li class='keycap tex' style='color:black'>2</li>
          <li class='separator w5'></li>
          <li class='keycap tex' style='color:black'>3</li>
          <li class='separator w5'></li>
          <li class='separator'></li>
          <li class='action' data-command='["moveUp"]' style='color:black; font-size: 1.5em'>&#9650;</li>
          <li class='separator'></li>
        </ul>
        <ul>
          <li class='keycap tex' style='color:black'>0</li>
          <li class='separator w5'></li>
          <li class='keycap tex' style='color:black'>.</li>
          <li class='separator w5'></li>
          <li class='keycap tex' style='color:black; font-size: 2em' data-insert='-'>(-)</li>
          <li class='separator w5'></li>
          <li class='action' data-command='["moveToPreviousChar"]' style='color:black; font-size: 1.5em'>&#9664;</li>
          <li class='action' data-command='["moveDown"]' style='color:black; font-size: 1.5em'>&#9660;</li>
          <li class='action' data-command='["moveToNextChar"]' style='color:black; font-size: 1.5em'>&#9654;</li>
        </ul>
      </div>
    `,
};

export const pureFractionLayer = {
	fraction: `
      <div class='rows'>
        <ul>
          <li class='keycap tex' style='color:black'>7</li>
          <li class='separator w5'></li>
          <li class='keycap tex' style='color:black'>8</li>
          <li class='separator w5'></li>
          <li class='keycap tex' style='color:black'>9</li>
          <li class='separator w5'></li>
          <li class='action font-glyph' data-alt-keys='delete' data-command='["deleteBackward"]' style='color:black; font-size: 1.5em'>&#x232b;</li>
          <li class='separator'></li>
          <li class='action font-glyph' data-alt-keys='delete' data-command='["deleteAll"]'style='color:red; font-weight: 600; font-size: 2.0em'>&#8557;</li>
        </ul>
        <ul>
          <li class='keycap tex' style='color:black'>4</li>
          <li class='separator w5'></li>
          <li class='keycap tex' style='color:black'>5</li>
          <li class='separator w5'></li>
          <li class='keycap tex' style='color:black'>6</li>
          <li class='separator w5'></li>
          <li class='action' style='color:blue; font-size:1em;' data-insert='\\frac{#?}{#0}'></li>
          <li class='separator'></li>
          <li class='action font-glyph' data-alt-keys='delete' data-command='["deleteForward"]' style='color:black; font-size: 1.5em; font-weight:600'>del</li>
        </ul>
        <ul>
          <li class='keycap tex' style='color:black'>1</li>
          <li class='separator w5'></li>
          <li class='keycap tex' style='color:black'>2</li>
          <li class='separator w5'></li>
          <li class='keycap tex' style='color:black'>3</li>
          <li class='separator w5'></li>
          <li class='separator'></li>
          <li class='action' data-command='["moveUp"]' style='color:black; font-size: 1.5em'>&#9650;</li>
          <li class='separator'></li>
        </ul>
        <ul>
          <li class='keycap tex' style='color:black'>0</li>
          <li class='separator w5'></li>
          <li class='separator'></li>
          <li class='separator w5'></li>
          <li class='keycap tex' style='color:black; font-size: 2em' data-insert='-'>(-)</li>
          <li class='separator w5'></li>
          <li class='action' data-command='["moveToPreviousChar"]' style='color:black; font-size: 1.5em'>&#9664;</li>
          <li class='action' data-command='["moveDown"]' style='color:black; font-size: 1.5em'>&#9660;</li>
          <li class='action' data-command='["moveToNextChar"]' style='color:black; font-size: 1.5em'>&#9654;</li>
        </ul>
      </div>
    `,
};

export const fractionKeyboard = {
	'fraction-keyboard': {
		label: 'Fraction', // Label displayed in the Virtual Keyboard Switcher
		tooltip: 'Fraction', // Tooltip when hovering over the label
		layer: 'fraction',
	},
};

export const keyboardOptions = {
	plonkSound: 'null',
	keypressSound: 'null',
	customVirtualKeyboards: fractionKeyboard,
	virtualKeyboardToolbar: 'none',
	virtualKeyboards: 'fraction-keyboard',
	virtualKeyboardMode: 'onfocus', // 'onfocus',
	onBlur: checkForBlank,
};

function checkForBlank(mathfield) {
	if (mathfield.getValue() === '') {
		mathfield.setValue('\\bigstar');
	}
}
