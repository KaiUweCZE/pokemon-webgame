const variations = [
  { modifier: -0.5, probability: 0.025 }, // -50% with 2.5% chance
  { modifier: -0.4, probability: 0.05 }, // -40% with 5% chance
  { modifier: -0.3, probability: 0.075 }, // -30% with 7.5% chance
  { modifier: -0.2, probability: 0.1 }, // -20% with 10% chance
  { modifier: -0.1, probability: 0.15 }, // -10% with 15% chance
  { modifier: 0, probability: 0.2 }, // 0% with 20% chance
  { modifier: 0.1, probability: 0.15 }, // +10% with 15% chance
  { modifier: 0.2, probability: 0.1 }, // +20% with 10% chance
  { modifier: 0.3, probability: 0.075 }, // +30% with 7.5% chance
  { modifier: 0.4, probability: 0.05 }, // +40% with 5% chance
  { modifier: 0.5, probability: 0.025 }, // +50% with 2.5% chance
];

export const randomizeValue = (baseValue: number): number => {
  const random = Math.random();
  let cumulativeProbability = 0;

  for (const variation of variations) {
    cumulativeProbability += variation.probability;
    if (random <= cumulativeProbability) {
      const modifier = 1 + variation.modifier;
      return Math.round(baseValue * modifier);
    }
  }

  return Math.round(baseValue);
};
