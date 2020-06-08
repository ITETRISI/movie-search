import location from './search-location';
import { microphone } from './data';

function inputByMicrophone(language) {
  if (!language) {
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
  recognizer.onend = () => {
    microphone.classList.remove('active');
  };
  microphone.classList.add('active');
  recognizer.start();
}

export default inputByMicrophone;
