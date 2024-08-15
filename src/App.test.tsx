import { RoundToTwoDecimals } from "./Components/Welcome/Functions";

describe('RoundToTwoDecimals', () => {
  test('correctly rounds positive numbers', () => {
    expect(RoundToTwoDecimals(3.456)).toBe(3.46);
    expect(RoundToTwoDecimals(1.2345)).toBe(1.23);
    expect(RoundToTwoDecimals(2.005)).toBe(2.01);
  });

  test('correctly rounds negative numbers', () => {
    expect(RoundToTwoDecimals(-3.456)).toBe(-3.46);
    expect(RoundToTwoDecimals(-1.2345)).toBe(-1.23);
    expect(RoundToTwoDecimals(-2.005)).toBe(-2.01);
  });

  test('does not alter numbers that are already rounded', () => {
    expect(RoundToTwoDecimals(3.00)).toBe(3.00);
    expect(RoundToTwoDecimals(-1.50)).toBe(-1.50);
    expect(RoundToTwoDecimals(2.75)).toBe(2.75);
  });

  test('handles edge cases with .005 rounding', () => {
    expect(RoundToTwoDecimals(2.005)).toBe(2.01);
    expect(RoundToTwoDecimals(2.004)).toBe(2.00);
    expect(RoundToTwoDecimals(-2.005)).toBe(-2.01);
  });

  test('correctly rounds zero', () => {
    expect(RoundToTwoDecimals(0)).toBe(0.00);
    expect(RoundToTwoDecimals(-0)).toBe(0.00);
  });
});