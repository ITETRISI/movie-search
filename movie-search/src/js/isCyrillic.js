export default function isCyrillic(word) {
	return /[а-яё]/i.test(word);
}