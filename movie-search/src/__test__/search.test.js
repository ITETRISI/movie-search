import  isCyrillic  from '../js/isCyrillic'

describe('isCyrillic', () => {
	it('should return true', () => {
		expect(isCyrillic('фыва')).toEqual(true);
	});
})
