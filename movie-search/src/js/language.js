import keyboard from './keyboard';

class Language {
  checkLanguage() {
    if (sessionStorage.getItem('lang') === null) {
      sessionStorage.setItem('lang', 0);
      return Number(sessionStorage.getItem('lang'));
    }
    return Number(sessionStorage.getItem('lang'));
  }

  changeLanguage(event) {
    if (event === 'ControlLeft' || event === 'ControlRight') {
      if (sessionStorage.getItem('lang') >= 2) {
        sessionStorage.setItem('lang', Number(sessionStorage.getItem('lang')) - 2);
      } else {
        sessionStorage.setItem('lang', Number(sessionStorage.getItem('lang')) + 2);
      }
      keyboard.rewriteKey();
    }
  }
}

const language = new Language();

export default language;
