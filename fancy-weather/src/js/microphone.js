export default function inputByMicrophone(language) {
	if (language === null) {
		language = 'en';
	}
	const recognizer = new webkitSpeechRecognition();
	recognizer.interimResults = true;
	language += '-' + language.charAt(0).toUpperCase() + language.slice(1);
	recognizer.lang = language;
	recognizer.onresult = (event) => {
		const result = event.results[event.resultIndex];
		if (result.isFinal) {
			document.querySelector('#input').value = result[0].transcript;
		}
	};
	recognizer.start();
}
