const {sum,doubleToDegree} = require('./function');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('convert longitude', () => {
  expect(doubleToDegree(27.5618791)).not.toBe(`27°330'`);
});

test('convert latitude', () => {
  expect(doubleToDegree(53.902334)).not.toBeNaN();
});

test('coordinates not equal', () => {
  expect(doubleToDegree(53.902334)).not.toEqual(doubleToDegree(27.5618791));
});