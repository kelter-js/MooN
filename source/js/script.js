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
const PHONE_ELEMENT_MAX_LENGTH = 18;
const MIN_RANGE = 4;
const DEFAULT_VALUE = '_';

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

const setRange = (element, start) => {
  element.setSelectionRange(start, start)
}

const onInput = (evt) => {
  evt.preventDefault();
  let currentCaretPosition = PHONE_ELEMENT.selectionStart;
  if(+evt.key) {
    if (SKIPPING_RANGE[currentCaretPosition]) currentCaretPosition = SKIPPING_RANGE[currentCaretPosition];
    switch (currentCaretPosition) {
      case 4:
        numberExample[0] = evt.key;
        break;
      case 5:
        numberExample[1] = evt.key;
        break;
      case 6:
        numberExample[2] = evt.key;
        break;
      case 9:
        numberExample[3] = evt.key;
        break;
      case 10:
        numberExample[4] = evt.key;
        break;
      case 11:
        numberExample[5] = evt.key;
        break;
      case 13:
        numberExample[6] = evt.key;
        break;
      case 14:
        numberExample[7] = evt.key;
        break;
      case 16:
        numberExample[8] = evt.key;
        break;
      case 17:
        numberExample[9] = evt.key;
        break;
      }
    }
    if (evt.key === 'ArrowLeft') {
      currentCaretPosition = PHONE_ELEMENT.selectionStart - 1;
      setRange(PHONE_ELEMENT, currentCaretPosition);
      return;
    }
    if (evt.key === 'ArrowRight') {
      currentCaretPosition = PHONE_ELEMENT.selectionStart + 1;
      setRange(PHONE_ELEMENT, currentCaretPosition);
      return;
    }
    if(evt.key === 'Backspace') {
      if (currentCaretPosition < MIN_RANGE) {
        setRange(PHONE_ELEMENT, MIN_RANGE);
        return;
      }
      setRange(PHONE_ELEMENT, currentCaretPosition - 1);
      console.log(currentCaretPosition)
      switch (currentCaretPosition) {
        case 5:
          numberExample[0] = DEFAULT_VALUE;
          break;
        case 6:
          numberExample[1] = DEFAULT_VALUE;
          break;
        case 7:
          numberExample[2] = DEFAULT_VALUE;
          break;
        case 10:
          numberExample[3] = DEFAULT_VALUE;
          break;
        case 11:
          numberExample[4] = DEFAULT_VALUE;
          break;
        case 12:
          numberExample[5] = DEFAULT_VALUE;
          break;
        case 14:
          numberExample[6] = DEFAULT_VALUE;
          break;
        case 15:
          numberExample[7] = DEFAULT_VALUE;
          break;
        case 17:
          numberExample[8] = DEFAULT_VALUE;
          break;
        case 18:
          numberExample[9] = DEFAULT_VALUE;
          break;
        }
    }
    if (evt.key === 'Delete') {
      if (currentCaretPosition < MIN_RANGE) {
        setRange(PHONE_ELEMENT, MIN_RANGE);
        return;
      }
      let currentLength;
      switch (currentCaretPosition) {
        case 4:
          numberExample[0] = DEFAULT_VALUE;
          numberExample = numberExample.filter((item) => +item);
          currentLength = numberExample.length;
          numberExample.length = 10;
          numberExample.fill('_', currentLength);
          break;
        case 5:
          numberExample[1] = DEFAULT_VALUE;
          numberExample = numberExample.filter((item) => +item);
          currentLength = numberExample.length;
          numberExample.length = 10;
          numberExample.fill('_', currentLength);
          break;
        case 6:
          numberExample[2] = DEFAULT_VALUE;
          numberExample = numberExample.filter((item) => +item);
          currentLength = numberExample.length;
          numberExample.length = 10;
          numberExample.fill('_', currentLength);
          break;
        case 9:
          numberExample[3] = DEFAULT_VALUE;
          numberExample = numberExample.filter((item) => +item);
          currentLength = numberExample.length;
          numberExample.length = 10;
          numberExample.fill('_', currentLength);
          break;
        case 10:
          numberExample[4] = DEFAULT_VALUE;
          numberExample = numberExample.filter((item) => +item);
          currentLength = numberExample.length;
          numberExample.length = 10;
          numberExample.fill('_', currentLength);
          break;
        case 11:
          numberExample[5] = DEFAULT_VALUE;
          numberExample = numberExample.filter((item) => +item);
          currentLength = numberExample.length;
          numberExample.length = 10;
          numberExample.fill('_', currentLength);
          break;
        case 13:
          numberExample[6] = DEFAULT_VALUE;
          numberExample = numberExample.filter((item) => +item);
          currentLength = numberExample.length;
          numberExample.length = 10;
          numberExample.fill('_', currentLength);
          break;
        case 14:
          numberExample[7] = DEFAULT_VALUE;
          numberExample = numberExample.filter((item) => +item);
          currentLength = numberExample.length;
          numberExample.length = 10;
          numberExample.fill('_', currentLength);
          break;
        case 16:
          numberExample[8] = DEFAULT_VALUE;
          numberExample = numberExample.filter((item) => +item);
          currentLength = numberExample.length;
          numberExample.length = 10;
          numberExample.fill('_', currentLength);
          break;
        case 17:
          numberExample[9] = DEFAULT_VALUE;
          numberExample = numberExample.filter((item) => +item);
          currentLength = numberExample.length;
          numberExample.length = 10;
          numberExample.fill('_', currentLength);
          break;
        }
    }
    PHONE_ELEMENT.value = `+7 (${numberExample[0]}${numberExample[1]}${numberExample[2]}) ${numberExample[3]}${numberExample[4]}${numberExample[5]} ${numberExample[6]}${numberExample[7]}-${numberExample[8]}${numberExample[9]}`;
    if (evt.key === 'Delete') {
      PHONE_ELEMENT.setSelectionRange(currentCaretPosition, currentCaretPosition);
      return;
    }
    if (evt.key === 'Backspace') {
      PHONE_ELEMENT.setSelectionRange(--currentCaretPosition, currentCaretPosition)
    }
    if(+evt.key) {
      PHONE_ELEMENT.setSelectionRange(++currentCaretPosition, currentCaretPosition);
    }
};

PHONE_ELEMENT.addEventListener('keydown', onInput);

