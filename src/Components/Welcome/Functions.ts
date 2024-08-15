export const RoundToTwoDecimals = (num: number): number => {
  const factor = num < 0 ? -1 : 1;
  return Math.round((num + Number.EPSILON) * 100 * factor) / (100 * factor);
};


