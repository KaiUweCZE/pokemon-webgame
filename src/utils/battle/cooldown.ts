export const calculateCooldown = (baseRecoveryTime: number, pokemonSpeed: number): number => {
  const speedReduction = pokemonSpeed * 0.1; // 10% reduction per speed point
  const adjustedTime = (baseRecoveryTime - speedReduction).toFixed(1);

  // Ensure minimum cooldown of 1 second
  return Math.max(1, Number(adjustedTime));
};
