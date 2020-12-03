import  { isCyrillic , isShift }  from '../js/function'

describe('isCyrillic', () => {
	it('should return true', () => {
		expect(isCyrillic('фыва')).toEqual(true);
	});
})

describe('isShift', () => {
	it('should return true', () => {
		expect(isShift('ShiftRight')).toEqual(true);
	});
})
