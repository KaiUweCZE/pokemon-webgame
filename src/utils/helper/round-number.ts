export const roundNumber = (number: number, decimals: number): number => {
  const multiplier = Math.pow(10, decimals);
  return Math.round(number * multiplier) / multiplier;
};
