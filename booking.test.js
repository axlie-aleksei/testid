const { bookingPrice } = require('./booking');

test('one night, one guest costs 50', () => {
  expect(bookingPrice(1, 1)).toBe(50);
});

test('3 nights, one guest costs 150', () => {
  expect(bookingPrice(3, 1)).toBe(150);
});

test('3 nights, two guests costs 180', () => {
  expect(bookingPrice(3, 2)).toBe(180);
});

test('2 nights, four guests costs 160', () => {
  expect(bookingPrice(2, 4)).toBe(160);
});

test('30 nights is allowed', () => {
  expect(bookingPrice(30, 1)).toBe(1500);
});

test('31 nights throws an error', () => {
  expect(() => bookingPrice(31, 1)).toThrow();
});

test('0 nights throws an error', () => {
  expect(() => bookingPrice(0, 1)).toThrow();
});

test('5 guests throws an error', () => {
  expect(() => bookingPrice(1, 5)).toThrow();
});

test('guests default to 1', () => {
  expect(bookingPrice(2)).toBe(100);
});

test('WEEKEND gives 15 percent discount for 2 nights', () => {
  expect(bookingPrice(2, 1, 'WEEKEND')).toBe(85);
});

test('WEEKEND discount does not apply to 1 night', () => {
  expect(bookingPrice(1, 1, 'WEEKEND')).toBe(50);
});

test('WEEKEND code is case insensitive', () => {
  expect(bookingPrice(3, 1, 'weekend')).toBe(127.5);
});

test('LONGSTAY does not give discount for 6 nights', () => {
  expect(bookingPrice(6, 1, 'LONGSTAY')).toBe(300);
});

test('LONGSTAY gives 20 percent discount for 7 nights', () => {
  expect(bookingPrice(7, 1, 'LONGSTAY')).toBe(280);
});

test('LONGSTAY gives 20 percent discount for 8 nights', () => {
  expect(bookingPrice(8, 1, 'LONGSTAY')).toBe(320);
});

test('LONGSTAY code is case insensitive', () => {
  expect(bookingPrice(7, 1, 'longstay')).toBe(280);
});

test('LONGSTAY replaces WEEKEND discount when both codes are given', () => {
  expect(bookingPrice(7, 1, 'LONGSTAY')).toBe(280);
});