import {
	arrayOfKeys,
	input,
} from './data';
import language from './language';
import { search, showKeyboard } from './search';

class Keyboard {
	constructor() {
		this.pressCaps = false;
		this.pressShift = false;
	}

	drawKeyboard() {
		for (let i = 0; i < arrayOfKeys.length; i++) {
			for (let j = 0; j < arrayOfKeys[i].length; j++) {
				document.querySelector(`#keyboard_row-${i}`).innerHTML += `<button id='${arrayOfKeys[i][j].id}' >${arrayOfKeys[i][j].value[language.checkLanguage()]}</button>`;
			}
		}
	}

	rewriteKey() {
		for (let i = 0; i < arrayOfKeys.length; i++) {
			for (let j = 0; j < arrayOfKeys[i].length; j++) {
				if (this.pressCaps && i === 0 && !this.pressShift)
					document.querySelector(`#${arrayOfKeys[i][j].id}`).innerText = `${arrayOfKeys[i][j].value[i]}`;
				else if (this.pressCaps && i === 0 && this.pressShift)
					document.querySelector(`#${arrayOfKeys[i][j].id}`).innerText = `${arrayOfKeys[i][j].value[language.checkLanguage()+1]}`;
				else
					document.querySelector(`#${arrayOfKeys[i][j].id}`).innerText = `${arrayOfKeys[i][j].value[language.checkLanguage()]}`;
			}
		}
	}

	pressKey(keyCode) {
		switch (keyCode) {
			case 'ControlLeft':
				break;
			case 'ControlRight':
				break;
			case 'ShiftLeft':
				this.downShift(keyCode);
				break;
			case 'ShiftRight':
				this.downShift(keyCode);
				break;
			case 'CapsLock':
				break;
			case 'AltLeft':
				break;
			case 'AltRight':
				break;
			case 'MetaLeft':
				break;
			case 'ArrowLeft':
				input.selectionStart = --input.selectionEnd;
				break;
			case 'ArrowRight':
				input.selectionEnd = ++input.selectionStart;
				break;
			case 'Space':
				input.setRangeText(' ', input.selectionStart, input.selectionEnd, 'end');
				break;
			case 'Tab':
				input.setRangeText('    ', input.selectionStart, input.selectionEnd, 'end');
				break;
			case 'Enter':
				search.startSearch();
				break;
			case 'Backspace':
				if (input.selectionStart !== 0) input.setRangeText('', input.selectionStart - 1, input.selectionStart, 'end');
				break;
			default:
				try {
					let key = document.querySelector(`#${keyCode}`).innerText
					input.setRangeText(key, input.selectionStart, input.selectionEnd, 'end');
					document.querySelector(`#${keyCode}`).classList.add('active');
				} catch (error) {}
		}
	}

	isShift (key) {
	 return key === 'ShiftRight' || key === 'ShiftLeft'
	}

	downShift(keyCode) {
		if (this.isShift(keyCode)) {
			if (keyboard.pressShift === false && keyboard.pressCaps === false) {
				sessionStorage.setItem('lang', Number(sessionStorage.getItem('lang')) + 1);
			} else if (this.pressShift === false) {
				sessionStorage.setItem('lang', Number(sessionStorage.getItem('lang')) - 1);
			}
			keyboard.pressShift = true;
			this.rewriteKey();
		}
	}

	upShift(keyCode) {
		if (this.isShift(keyCode)) {
			if (keyboard.pressShift === true && keyboard.pressCaps === false) {
				sessionStorage.setItem('lang', Number(sessionStorage.getItem('lang')) - 1);
			} else {
				sessionStorage.setItem('lang', Number(sessionStorage.getItem('lang')) + 1);
			}
			keyboard.pressShift = false;
			this.rewriteKey();
		}
	}

	pressCapsLock(keyCode) {
		if (keyCode === 'CapsLock') {
			if (keyboard.pressCaps === true) {
				sessionStorage.setItem('lang', Number(sessionStorage.getItem('lang')) - 1);
				keyboard.pressCaps = false;
				document.querySelector('#CapsLock').classList.remove('active');
			} else {
				sessionStorage.setItem('lang', Number(sessionStorage.getItem('lang')) + 1);
				keyboard.pressCaps = true;
				document.querySelector('#CapsLock').classList.add('active');
			}
			this.rewriteKey();
		}
	}
}

document.querySelector('.keyboard').innerHTML += `
  <div id="keyboard_row-0"></div>
  <div id="keyboard_row-1"></div>
  <div id="keyboard_row-2"></div>
  <div id="keyboard_row-3"></div>
  <div id="keyboard_row-4"></div>`;

input.focus();
input.onblur = () => {
	input.focus();
};

const keyboard = new Keyboard();

keyboard.drawKeyboard();

window.addEventListener('load', () => {
	document.addEventListener('keydown', (event) => {
		event.preventDefault();
		try{
		language.changeLanguage(event);
		keyboard.pressKey(event.code);
		document.querySelector(`#${event.code}`).classList.add('active');
		} catch(error){}
	});

	document.addEventListener('keyup', (event) => {
		try {
			keyboard.upShift(event.code);
			document.querySelector(`#${event.code}`).classList.remove('active');
			keyboard.pressCapsLock(event.code);
		} catch (error) {}
	});

	document.querySelector('.keyboard').addEventListener('mousedown', (event) => {
		keyboard.pressKey(event.target.id);
		document.querySelector(`#${event.target.id}`).classList.add('active');
	});

	document.querySelector('.keyboard').addEventListener('mouseup', (event) => {
		keyboard.upShift(event.target.id);
		document.querySelector(`#${event.target.id}`).classList.remove('active');
		keyboard.pressCapsLock(event.target.id);
	});
});

export default keyboard
