const cardContainer = document.querySelector('.swiper-wrapper');
const container = document.querySelector('.swiper');
const result = document.querySelector('.result');
const input = document.querySelector('.input');
const searchBtn = document.querySelector('.search');
const cancelBtn = document.querySelector('.cancel');
const loader = document.querySelector('.loader');
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mySwiper = new Swiper('.swiper-container', {
  speed: 1000,
  direction: 'horizontal',
  slidesPerView: 1,
  centerInsufficientSlides: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    425: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1300: {
      slidesPerView: 4,
    },
  },
});

const arrayOfKeys = [
  [
    { id: 'Backquote', value: ['`', '~', 'ё', 'Ё'] },
    { id: 'Digit1', value: ['1', '!', '1', '!'] },
    { id: 'Digit2', value: ['2', '@', '2', '"'] },
    { id: 'Digit3', value: ['3', '#', '3', '№'] },
    { id: 'Digit4', value: ['4', '$', '4', ';'] },
    { id: 'Digit5', value: ['5', '%', '5', '%'] },
    { id: 'Digit6', value: ['6', '^', '6', ':'] },
    { id: 'Digit7', value: ['7', '&', '7', '?'] },
    { id: 'Digit8', value: ['8', '*', '8', '*'] },
    { id: 'Digit9', value: ['9', '(', '9', '('] },
    { id: 'Digit0', value: ['0', ')', '0', ')'] },
    { id: 'Minus', value: ['-', '_', '-', '_'] },
    { id: 'Equal', value: ['=', '+', '=', '+'] },
    { id: 'Backspace', value: ['Backspace', 'Backspace', 'Backspace', 'Backspace'] },
  ],
  [
    { id: 'Tab', value: ['Tab', 'Tab', 'Tab', 'Tab'] },
    { id: 'KeyQ', value: ['q', 'Q', 'й', 'Й'] },
    { id: 'KeyW', value: ['w', 'W', 'ц', 'Ц'] },
    { id: 'KeyE', value: ['e', 'E', 'у', 'У'] },
    { id: 'KeyR', value: ['r', 'R', 'к', 'К'] },
    { id: 'KeyT', value: ['t', 'T', 'е', 'Е'] },
    { id: 'KeyY', value: ['y', 'Y', 'н', 'Н'] },
    { id: 'KeyU', value: ['u', 'U', 'г', 'Г'] },
    { id: 'KeyI', value: ['i', 'I', 'ш', 'Ш'] },
    { id: 'KeyO', value: ['o', 'O', 'щ', 'Щ'] },
    { id: 'KeyP', value: ['p', 'P', 'з', 'З'] },
    { id: 'BracketLeft', value: ['[', '{', 'х', 'Х'] },
    { id: 'BracketRight', value: [']', '}', 'ъ', 'Ъ'] },
    { id: 'Backslash', value: ['\\', '|', '\\', '/'] },
  ],
  [
    { id: 'CapsLock', value: ['CapsLock', 'CapsLock', 'CapsLock', 'CapsLock'] },
    { id: 'KeyA', value: ['a', 'A', 'ф', 'Ф'] },
    { id: 'KeyS', value: ['s', 'S', 'ы', 'Ы'] },
    { id: 'KeyD', value: ['d', 'D', 'в', 'В'] },
    { id: 'KeyF', value: ['f', 'F', 'а', 'А'] },
    { id: 'KeyG', value: ['g', 'G', 'п', 'П'] },
    { id: 'KeyH', value: ['h', 'H', 'р', 'Р'] },
    { id: 'KeyJ', value: ['j', 'J', 'о', 'О'] },
    { id: 'KeyK', value: ['k', 'K', 'л', 'Л'] },
    { id: 'KeyL', value: ['l', 'L', 'д', 'Д'] },
    { id: 'Semicolon', value: [';', ':', 'ж', 'Ж'] },
    { id: 'Quote', value: ['\'', '"', 'э', 'Э'] },
    { id: 'Enter', value: ['Enter', 'Enter', 'Enter', 'Enter'] },
  ],
  [
    { id: 'ShiftLeft', value: ['Shift', 'Shift', 'Shift', 'Shift'] },
    { id: 'KeyZ', value: ['z', 'Z', 'я', 'Я'] },
    { id: 'KeyX', value: ['x', 'X', 'ч', 'Ч'] },
    { id: 'KeyC', value: ['c', 'C', 'c', 'C'] },
    { id: 'KeyV', value: ['v', 'V', 'м', 'М'] },
    { id: 'KeyB', value: ['b', 'B', 'и', 'И'] },
    { id: 'KeyN', value: ['n', 'N', 'т', 'Т'] },
    { id: 'KeyM', value: ['m', 'M', 'ь', 'Ь'] },
    { id: 'Comma', value: [',', '<', 'б', 'Б'] },
    { id: 'Period', value: ['.', '>', 'ю', 'Ю'] },
    { id: 'Slash', value: ['/', '?', '.', ','] },
    { id: 'ShiftRight', value: ['Shift', 'Shift', 'Shift', 'Shift'] },
  ],
  [
    { id: 'ControlLeft', value: ['Ctrl + Alt', 'Ctrl + Alt', 'Ctrl + Alt', 'Ctrl + Alt'] },
    { id: 'Space', value: ['Space', 'Space', 'Space', 'Space'] },
    { id: 'ArrowLeft', value: ['\u2190', '\u2190', '\u2190', '\u2190'] },
    { id: 'ArrowRight', value: ['\u2192', '\u2192', '\u2192', '\u2192'] },
    { id: 'ControlRight', value: ['Ctrl + Alt', 'Ctrl + Alt', 'Ctrl + Alt', 'Ctrl + Alt'] },
  ],
];

const keyboardShowBtn = document.querySelector('.keyboardShowBtn');
const keyboard = document.querySelector('.keyboard');
const userCollection = document.querySelector('.user__collection');
const userCollectionCount = document.querySelector('.user__collection-count');
const omdbApi = 'https://www.omdbapi.com/';
const yandexApi = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200424T194324Z.1fc3d382b16099a7.576c0a6f5f134312f2eaec19bb60b5a666de1916&text=';
export {
  yandexApi,
  omdbApi,
  container,
  cardContainer,
  result,
  input,
  searchBtn,
  cancelBtn,
  loader,
  delay,
  mySwiper,
  arrayOfKeys,
  keyboardShowBtn,
  keyboard,
  userCollection,
  userCollectionCount,
};
