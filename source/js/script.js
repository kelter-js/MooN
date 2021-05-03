const NAVIGATION_ELEMENT = document.querySelector('.main-nav');
const TOGGLE_NAVIGATION_BUTTON = document.querySelector('.main-nav__toggle');

NAVIGATION_ELEMENT.classList.remove('main-nav--nojs');

const onClickToggleNavigation = () => {
  if (NAVIGATION_ELEMENT.classList.contains('main-nav--closed')) {
    NAVIGATION_ELEMENT.classList.remove('main-nav--closed');
    NAVIGATION_ELEMENT.classList.add('main-nav--opened');
    } else {
      NAVIGATION_ELEMENT.classList.add('main-nav--closed');
      NAVIGATION_ELEMENT.classList.remove('main-nav--opened');
  }
}

TOGGLE_NAVIGATION_BUTTON.addEventListener('click', onClickToggleNavigation);


//
const PHONE_ELEMENT = document.querySelector('#tel');

let numberExample = [
  '_',
  '_',
  '_',
  '_',
  '_',
  '_',
  '_',
  '_',
  '_',
  '_',
]

const MIN_RANGE = 4;
const MASK_LENGTH = 10;
const DEFAULT_VALUE = '_';
const DEFAULT_MASK = `+7 (___) ___-__-__`;

const ALLOWED_RANGE = [
  4,
  5,
  6,
  9,
  10,
  11,
  13,
  14,
  16,
  17,
];

const ALLOWED_PRESSED_KEYS = [
  'Backspace',
  'Delete',
  'ArrowLeft',
  'ArrowRight',
  'Control',
  'v',
];

const SKIPPING_RANGE = {
  "0" : 4,
  "1" : 4,
  "2" : 4,
  "3" : 4,
  "7" : 9,
  "8" : 9,
  "12" : 13,
  "15" : 16,
};

const fillRest = (neededToFill) => {
  let currentLength = neededToFill.length;
  neededToFill.length = MASK_LENGTH;
  neededToFill.fill(DEFAULT_VALUE, currentLength);
}

const setRange = (start = MIN_RANGE, element = PHONE_ELEMENT) => {
  element.setSelectionRange(start, start)
}

const correctExample = (currentPosition) => {
  let mutatedExample = numberExample.slice(ALLOWED_RANGE.indexOf(currentPosition)).filter((item) => +item);
  numberExample.splice(ALLOWED_RANGE.indexOf(currentPosition));
  numberExample.push(...mutatedExample)
  fillRest(numberExample)
}

const pressedInteger = (range, position, pressedButton) => {
  numberExample.splice(range.indexOf(position), 0, pressedButton);
}

const setDefault = (range, position) => {
  numberExample[range.indexOf(position)] = DEFAULT_VALUE;
}

const filterField = (range, pressedButton, currentPosition) => {
  let mutatedRange = range;
  if (pressedButton === ALLOWED_PRESSED_KEYS[0]) {
    mutatedRange = mutatedRange.map((range) => ++range);
  }
  if (mutatedRange.includes(currentPosition)) {
    if (+pressedButton) {
      pressedInteger(mutatedRange, currentPosition, pressedButton);
    }
    if (pressedButton === ALLOWED_PRESSED_KEYS[0]) {
      setDefault(mutatedRange, currentPosition);
    }
    if (pressedButton === ALLOWED_PRESSED_KEYS[1]) {
      setDefault(mutatedRange, currentPosition);
      correctExample(currentPosition);
    }
  }
  numberExample.length = MASK_LENGTH;
};

const onInput = (evt) => {
  let pressedButton = evt.key;

  if (pressedButton === ALLOWED_PRESSED_KEYS[4] || pressedButton === ALLOWED_PRESSED_KEYS[5]) return;

  evt.preventDefault();
  let currentCaretPosition = PHONE_ELEMENT.selectionStart;
  if (pressedButton === ALLOWED_PRESSED_KEYS[2]) {
    if (+currentCaretPosition <= MIN_RANGE) {
      setRange();
      return;
    }
    setRange(--currentCaretPosition);
    return;
  }

  if (pressedButton === ALLOWED_PRESSED_KEYS[3]) {
    setRange(++currentCaretPosition);
    return;
  }

  if(+pressedButton || pressedButton === ALLOWED_PRESSED_KEYS[1]) {
    if (SKIPPING_RANGE[currentCaretPosition]) currentCaretPosition = SKIPPING_RANGE[currentCaretPosition];
  }

  if (pressedButton !== ALLOWED_PRESSED_KEYS[0] || pressedButton !== ALLOWED_PRESSED_KEYS[1] || +pressedButton) {
    filterField(ALLOWED_RANGE, pressedButton, currentCaretPosition);
  }

  PHONE_ELEMENT.value = `+7 (${numberExample[0]}${numberExample[1]}${numberExample[2]}) ${numberExample[3]}${numberExample[4]}${numberExample[5]}-${numberExample[6]}${numberExample[7]}-${numberExample[8]}${numberExample[9]}`;

  if (pressedButton === ALLOWED_PRESSED_KEYS[1]) {
    if (currentCaretPosition < MIN_RANGE) {
      setRange();
      return;
    }
    PHONE_ELEMENT.setSelectionRange(currentCaretPosition, currentCaretPosition);
  }

  if (pressedButton === ALLOWED_PRESSED_KEYS[0]) {
    if (currentCaretPosition <= MIN_RANGE) {
      setRange();
      return;
    }
    PHONE_ELEMENT.setSelectionRange(--currentCaretPosition, currentCaretPosition);
  }

  if(+pressedButton) {
    PHONE_ELEMENT.setSelectionRange(++currentCaretPosition, currentCaretPosition);
  }
};

const onPaste = (evt) => {
  evt.preventDefault();
  let pasteNumber = evt.clipboardData.getData('text/plain').split('').filter((item) => +item)
  numberExample = pasteNumber.map((integer, index) => numberExample[index] = integer);
  fillRest(numberExample);
  PHONE_ELEMENT.value = `+7 (${numberExample[0]}${numberExample[1]}${numberExample[2]}) ${numberExample[3]}${numberExample[4]}${numberExample[5]}-${numberExample[6]}${numberExample[7]}-${numberExample[8]}${numberExample[9]}`;
  let lastIndexOfSymbol = PHONE_ELEMENT.value.split('').indexOf('_');
  PHONE_ELEMENT.setSelectionRange(lastIndexOfSymbol, lastIndexOfSymbol)
}

const onFocus = () => {
  PHONE_ELEMENT.value = DEFAULT_MASK;
  setTimeout(() => PHONE_ELEMENT.setSelectionRange(MIN_RANGE, MIN_RANGE), 0);
}

const onBlur = () => {
  PHONE_ELEMENT.value = '';
}

PHONE_ELEMENT.addEventListener('keydown', onInput);
PHONE_ELEMENT.addEventListener('focus', onFocus);
PHONE_ELEMENT.addEventListener('blur', onBlur);
PHONE_ELEMENT.addEventListener('paste', onPaste);

