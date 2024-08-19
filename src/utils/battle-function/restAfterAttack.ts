/**
 * Calculates the rest time after an attack based on the pokemon's speed and the base reset time of the attack.
 *
 * @param speed - The speed stat of the pokemon (typically between 1 and 100)
 * @param reset - The base reset time of the attack in seconds
 * @returns The adjusted rest time in seconds, with a minimum of 0.1 seconds
 */

export const restAfterAttack = (speed: number, reset: number): number => {
  // each point of speed reduces the reset time by 0.02 s
  const reduction = speed * 0.02;
  const reduceReset = reset - reduction;

  // ensure the rest time is never less than 0.1s
  const result = Math.max(reduceReset, 0.1);

  // round to 1 decimal place
  return Math.round(result * 10) / 10;
};

/*
Example usage:
pokemonSpeed = 50
attackReset = 5s
reducedReset = 5 - 50 * 0.02 ==> 4
result = max between 4 and 0.1
*/
