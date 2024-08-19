import { clamp } from "./clamp";

export const calculateStat = (
  baseStat: number,
  level: number,
  rate: number
): number => {
  return parseFloat(
    (baseStat * Math.pow(1.05, level) * clamp(rate, 0.5, 1.5)).toFixed(2)
  );
};
