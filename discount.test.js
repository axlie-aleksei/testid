const { applyDiscount } = require('./discount');

// 2a — BLACK BOX

// black
test('no code returns the price unchanged', () => {
  expect(applyDiscount(100, undefined)).toBe(100);
});

// black
test('unknown code returns the price unchanged', () => {
  expect(applyDiscount(100, 'UNKNOWN')).toBe(100);
});

// black
test('STUDENT10 gives 10 percent discount', () => {
  expect(applyDiscount(100, 'STUDENT10')).toBe(90);
});

// black
test('STUDENT10 rounds the result to cents', () => {
  expect(applyDiscount(33.33, 'STUDENT10')).toBe(30);
});

// black
test('WELCOME gives 5 euros discount when price is 20 euros', () => {
  expect(applyDiscount(20, 'WELCOME')).toBe(15);
});

// black
test('WELCOME does not discount price below 20 euros', () => {
  expect(applyDiscount(19.99, 'WELCOME')).toBe(19.99);
});

// black
test('WELCOME gives 5 euros discount when price is above 20 euros', () => {
  expect(applyDiscount(20.01, 'WELCOME')).toBe(15.01);
});

// black
test('empty code returns the price unchanged', () => {
  expect(applyDiscount(100, '')).toBe(100);
});

// black
test('STUDENT10 works with a different price', () => {
  expect(applyDiscount(50, 'STUDENT10')).toBe(45);
});

// black
test('WELCOME works with a higher price', () => {
  expect(applyDiscount(100, 'WELCOME')).toBe(95);
});

// white
test('VIP customer gets additional 20 percent discount', () => {
  expect(applyDiscount(100, 'STUDENT10', { isVip: true })).toBe(72);
});

// white
test('non-VIP customer does not get additional discount', () => {
  expect(applyDiscount(100, 'STUDENT10', { isVip: false })).toBe(90);
});

// white
// FREE is not described in the specification, so this behavior must be clarified.
test('FREE code returns zero', () => {
  expect(applyDiscount(100, 'FREE')).toBe(0);
});

// 2c — GREY BOX

// grey
test('lowercase discount code does not match uppercase code', () => {
  expect(applyDiscount(100, 'student10')).toBe(100);
});

// grey
test('VIP customer gets additional 20 percent discount', () => {
  expect(applyDiscount(100, 'STUDENT10', { isVip: true })).toBe(72);
});

// grey
test('customer without isVip does not get VIP discount', () => {
  expect(applyDiscount(100, 'STUDENT10', {})).toBe(90);
});

// 2b — WHITE BOX: run coverage, open discount.js, cover every branch.

// 2c — GREY BOX: use what you learned about the code structure to design new tests.