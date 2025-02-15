export const calculateCatchRate = (hpRemaining: number): number => {
  // hp remaining percentage
  const catchRate = 100 - hpRemaining;
  return catchRate;
};

export const handleCatchPokemon = (catchRate: number) => {
  const random = Math.random() * 100;

  return random <= catchRate;
};
