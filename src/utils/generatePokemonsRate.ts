export const generatePokemonsRate = () => {
  const round = (num: number) => Math.round(num * 10) / 10;
  const randomRate = () => round(0.5 + Math.random());

  const dmgRate = randomRate();
  const speedRate = randomRate();
  const hpRate = randomRate();
  const defenseRate = randomRate();
  const energyRate = randomRate();

  return { dmgRate, speedRate, hpRate, defenseRate, energyRate };
};
