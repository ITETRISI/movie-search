export function isCyrillic(word) {
	return /[а-яё]/i.test(word);
}

export function isShift(key) {
	return key === 'ShiftRight' || key === 'ShiftLeft';
}
