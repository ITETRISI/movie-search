export function isCyrillic(word) {
	return /[а-я]/i.test(word);
}

export function isShift(key) {
	return key === 'ShiftRight' || key === 'ShiftLeft';
}
