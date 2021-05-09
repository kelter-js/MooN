/* eslint-env es6 */
'use strict';
const NAVIGATION_ELEMENT = document.querySelector('.main-nav');
const TOGGLE_NAVIGATION_BUTTON = document.querySelector('.main-nav__toggle');
const PHONE_ELEMENT = document.querySelector('#tel');
const MAP_IMAGE_ELEMENT = document.querySelector('.page-footer__map-wrapper');
const MAP_INTERACTIVE_ELEMENT = document.querySelector('.page-footer__map-interactive');
const INVISIBLE_MAP_IMAGE_CLASS = 'page-footer__map-wrapper--invisible';
const INVISIBLE_MAP_INTERACTIVE_CLASS = 'page-footer__map-interactive--invisible';

if (NAVIGATION_ELEMENT) {
  NAVIGATION_ELEMENT.classList.remove('main-nav--nojs');
  const onClickToggleNavigation = () => {
    if (NAVIGATION_ELEMENT.classList.contains('main-nav--closed')) {
      NAVIGATION_ELEMENT.classList.remove('main-nav--closed');
      NAVIGATION_ELEMENT.classList.add('main-nav--opened');
    } else {
      NAVIGATION_ELEMENT.classList.add('main-nav--closed');
      NAVIGATION_ELEMENT.classList.remove('main-nav--opened');
    }
  };
  TOGGLE_NAVIGATION_BUTTON.addEventListener('click', onClickToggleNavigation);
}

if (PHONE_ELEMENT) {
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
  ];

  const MIN_RANGE = 4;
  const MAX_RANGE = 17;
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
    'Control',
    'v',
  ];

  const findClosestEmptySlot = () => {
    return PHONE_ELEMENT.value.split('').indexOf('_');
  };

  const setPositionNonInt = (position, neededToMove) => {
    if (neededToMove) {
      if (position <= MIN_RANGE) {
        setRange();
        return;
      }
      setRange(--position);
    }
    if (position < MIN_RANGE) {
      setRange();
      return;
    }
    setRange(position);
  };

  const SKIPPING_RANGE = {
    '0': 4,
    '1': 4,
    '2': 4,
    '3': 4,
    '7': 9,
    '8': 9,
    '12': 13,
    '15': 16,
  };

  const fillRest = (neededToFill) => {
    let currentLength = neededToFill.length;
    neededToFill.length = MASK_LENGTH;
    neededToFill.fill(DEFAULT_VALUE, currentLength);
  };

  const setRange = (start = MIN_RANGE, element = PHONE_ELEMENT) => {
    element.setSelectionRange(start, start);
  };

  const correctExample = (currentPosition) => {
    let mutatedExample = numberExample.slice(ALLOWED_RANGE.indexOf(currentPosition)).filter((item) => +item);
    numberExample.splice(ALLOWED_RANGE.indexOf(currentPosition));
    numberExample.push(...mutatedExample);
    fillRest(numberExample);
  };

  const pressedInteger = (range, position, pressedButton) => {
    numberExample.splice(range.indexOf(position), 0, pressedButton);
  };

  const setDefault = (range, position) => {
    numberExample[range.indexOf(position)] = DEFAULT_VALUE;
  };

  const filterField = (range, pressedButton, currentPosition) => {
    let mutatedRange = range;
    if (pressedButton === ALLOWED_PRESSED_KEYS[0]) {
      mutatedRange = mutatedRange.map((value) => ++value);
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

  const FUNCTIONAL_BUTTONS = {
    'Home': () => PHONE_ELEMENT.setSelectionRange(MIN_RANGE, MIN_RANGE),
    'End': () => PHONE_ELEMENT.setSelectionRange(MAX_RANGE, MAX_RANGE),
    'ArrowRight': (position) => setRange(++position),
    'ArrowLeft': (position) => setPositionNonInt(position, true),
    'Delete': (position) => setPositionNonInt(position),
    'Backspace': (position) => setPositionNonInt(position, true),
  };

  const onInput = (evt) => {
    let pressedButton = evt.key;
    if (pressedButton === ALLOWED_PRESSED_KEYS[2] || pressedButton === ALLOWED_PRESSED_KEYS[3]) {
      return;
    }

    evt.preventDefault();
    let currentCaretPosition = PHONE_ELEMENT.selectionStart;

    if (+pressedButton || pressedButton === ALLOWED_PRESSED_KEYS[1]) {
      if (SKIPPING_RANGE[currentCaretPosition]) {
        currentCaretPosition = SKIPPING_RANGE[currentCaretPosition];
      }
    }

    if (pressedButton !== ALLOWED_PRESSED_KEYS[0] || pressedButton !== ALLOWED_PRESSED_KEYS[1] || +pressedButton) {
      filterField(ALLOWED_RANGE, pressedButton, currentCaretPosition);
    }

    PHONE_ELEMENT.value = `+7 (${numberExample[0]}${numberExample[1]}${numberExample[2]}) ${numberExample[3]}${numberExample[4]}${numberExample[5]}-${numberExample[6]}${numberExample[7]}-${numberExample[8]}${numberExample[9]}`;

    if (FUNCTIONAL_BUTTONS[pressedButton]) {
      FUNCTIONAL_BUTTONS[pressedButton](currentCaretPosition);
      return;
    }

    if (+pressedButton) {
      PHONE_ELEMENT.setSelectionRange(++currentCaretPosition, currentCaretPosition);
    }
  };

  const onPaste = (evt) => {
    evt.preventDefault();
    let pasteNumber = evt.clipboardData.getData('text/plain').split('').filter((item) => +item);
    numberExample = pasteNumber.map((integer, index) => {
      numberExample[index] = integer;
    });
    fillRest(numberExample);
    PHONE_ELEMENT.value = `+7 (${numberExample[0]}${numberExample[1]}${numberExample[2]}) ${numberExample[3]}${numberExample[4]}${numberExample[5]}-${numberExample[6]}${numberExample[7]}-${numberExample[8]}${numberExample[9]}`;
    setRange(findClosestEmptySlot());
  };

  const onFocus = () => {
    if (numberExample.filter((item) => +item).length !== 0) {
      return;
    }
    PHONE_ELEMENT.value = DEFAULT_MASK;
    setTimeout(() => PHONE_ELEMENT.setSelectionRange(MIN_RANGE, MIN_RANGE), 0);
  };

  const onBlur = () => {
    if (numberExample.filter((item) => +item).length === 0) {
      PHONE_ELEMENT.value = '';
    }
  };

  PHONE_ELEMENT.addEventListener('keydown', onInput);
  PHONE_ELEMENT.addEventListener('focus', onFocus);
  PHONE_ELEMENT.addEventListener('blur', onBlur);
  PHONE_ELEMENT.addEventListener('paste', onPaste);
}

if (MAP_IMAGE_ELEMENT) {
  MAP_IMAGE_ELEMENT.classList.add(INVISIBLE_MAP_IMAGE_CLASS);
  MAP_INTERACTIVE_ELEMENT.classList.remove(INVISIBLE_MAP_INTERACTIVE_CLASS);
}
