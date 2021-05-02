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

const loger = () => {
  PHONE_ELEMENT.value = '+7 (...)-...-..-..';
};

PHONE_ELEMENT.addEventListener('change', loger);
