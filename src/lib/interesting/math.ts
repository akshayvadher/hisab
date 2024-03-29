export const round = (num: number, precision = 2) => {
  const factor = Math.pow(10, precision);
  return Math.round((num + Number.EPSILON) * factor) / factor; // EPISILON for edge cases
};
