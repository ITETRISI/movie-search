import location from './search-location';

export default function inputByMicrophone(language) {
  if (language === null) {
    language = 'en';
  }
  const recognizer = new webkitSpeechRecognition();
  recognizer.interimResults = true;
  recognizer.lang = language;
  recognizer.onresult = (event) => {
    const result = event.results[event.resultIndex];
    if (result.isFinal) {
      document.querySelector('#input').value = result[0].transcript;
      location.searchLocation(result[0].transcript, language);
    }
  };
  recognizer.start();
}
