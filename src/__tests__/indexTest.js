import calculy from '..';

test('Empty calculations', () => {
  expect(calculy.evaluate('')).toBe(0);
  expect(calculy.evaluate(' ')).toBe(0);
  expect(calculy.evaluate(' 0 ')).toBe(0);
});

test('Basic math.', () => {
  expect(calculy.evaluate('1 + 2')).toBe(3);
  expect(calculy.evaluate('1 + 2 * 3')).toBe(7);
  expect(calculy.evaluate('2^2')).toBe(4);
  expect(calculy.evaluate('2*3^3')).toBe(54);
  expect(calculy.evaluate('2*3^3')).toBe(54);
  expect(calculy.evaluate('1 * 1.2 / 2')).toBe(0.6);
});

test('Grouping.', () => {
  expect(calculy.evaluate('(1 + 2) * 3')).toBe(9);
});

test('Functions.', () => {
  expect(calculy.evaluate('log(100)*2')).toBe(4);
  expect(calculy.evaluate('ln(3)')).toBe(Math.log(3, Math.E));
  expect(calculy.evaluate('sin(3)')).toBe(Math.sin(3));
  expect(calculy.evaluate('√(3)')).toBe(Math.sqrt(3));
  expect(calculy.evaluate('tan(3)')).toBe(Math.tan(3));
  expect(calculy.evaluate('cos(3)')).toBe(Math.cos(3));
  expect(calculy.evaluate('cos(3)+3')).toBe(Math.cos(3) + 3);
});

test('Logarithms.', () => {
  expect(calculy.evaluate('log(1000)')).toBe(3);
  expect(calculy.evaluate('log(8, 2)')).toBe(3);
  expect(calculy.evaluate('log(64, 4)')).toBe(3);
});

test('Nth root.', () => {
  expect(calculy.evaluate('nthroot(9)')).toBe(3);
  expect(calculy.evaluate('nthroot(9, 2)')).toBe(3);
  expect(calculy.evaluate('nthroot(64, 3)')).toBe(4);
  expect(calculy.evaluate('nthroot(256, 4)')).toBe(4);
});

test('Negative numbers.', () => {
  expect(calculy.evaluate('-2-2')).toBe(-4);
  expect(calculy.evaluate('-2--2')).toBe(0);
  expect(calculy.evaluate('-2+-2')).toBe(-4);
  expect(calculy.evaluate('-e')).toBe(Math.E * -1);
  expect(calculy.evaluate('-(2+2)')).toBe(-4);
  expect(calculy.evaluate('-sin(3)')).toBe(Math.sin(3) * -1);
});

test('Factorial numbers.', () => {
  expect(calculy.evaluate('0!')).toBe(1);
  expect(calculy.evaluate('0.5!')).toBe(0.8862269254527586);
  expect(calculy.evaluate('1!')).toBe(1);
  expect(calculy.evaluate('2!')).toBe(2);
  expect(calculy.evaluate('2+2!^2')).toBe(6);
  expect(calculy.evaluate('2+(2+1)!^2')).toBe(38);
  expect(calculy.evaluate('2.5!')).toBe(3.3233509704478426);
  expect(calculy.evaluate('3!')).toBe(6);
  expect(calculy.evaluate('102!')).toBe(9.61446671503399e161);
  expect(calculy.evaluate('-2!')).toBe(-2);
});

test('Percentages.', () => {
  expect(calculy.evaluate('0%')).toBe(0);
  expect(calculy.evaluate('5%')).toBe(0.05);
  expect(calculy.evaluate('105%')).toBe(1.05);
  expect(calculy.evaluate('200%!')).toBe(2);
});

test('Combining modifiers', () => {
  expect(calculy.evaluate('2!%')).toBe(0.02);
  expect(calculy.evaluate('2!!')).toBe(2);
  expect(calculy.evaluate('100%!!')).toBe(1);
});

test('Constants.', () => {
  expect(calculy.evaluate('2 * pi')).toBe(2 * Math.PI);
  expect(calculy.evaluate('π')).toBe(Math.PI);
  expect(calculy.evaluate('2 * E')).toBe(2 * Math.E);
});

test('Implicit multiplications', () => {
  expect(calculy.evaluate('(3+1)π')).toBe(4 * Math.PI);
  expect(calculy.evaluate('2π')).toBe(2 * Math.PI);
  expect(calculy.evaluate('2π%^e')).toBe(2 * Math.pow(Math.PI / 100, Math.E));
  expect(calculy.evaluate('2%π')).toBe(0.02 * Math.PI);
  expect(calculy.evaluate('-2%π')).toBe(-0.02 * Math.PI);
  expect(calculy.evaluate('-2%π')).toBe(-0.02 * Math.PI);
  expect(calculy.evaluate('(2*2)π')).toBe(4 * Math.PI);
  expect(calculy.evaluate('2cos(pi)')).toBe(-2);
  expect(calculy.evaluate('(2*2)(2*2)')).toBe(16);
  expect(calculy.evaluate('-(2*2)(2*2)')).toBe(-16);
});

test('Absolute', () => {
  expect(calculy.evaluate('|-2|')).toBe(2);
  expect(calculy.evaluate('√(|-9|)')).toBe(3);
  expect(calculy.evaluate('|-2*8-3|')).toBe(19);
});

test('Scientific big number notation.', () => {
  expect(calculy.evaluate('5.2e+5')).toBe(520000);
  expect(calculy.evaluate('5.2e-3')).toBe(0.0052);
  expect(calculy.evaluate('5.2e-2-e')).toBe(0.052 - Math.E);
});

test('Ans.', () => {
  expect(calculy.evaluate('ans', 2)).toBe(2);
  expect(calculy.evaluate('ans^2', 2)).toBe(4);
  expect(calculy.evaluate('ans')).toBe(0);
});
