export const generatePokemonsRate = () => {
  const round = (num: number) => Math.round(num * 10) / 10;
  const dmgRate = round(Math.random() + 0.5);
  const speedRate = round(Math.random() + 0.5);
  const hpRate = round(Math.random() + 0.5);
  const defenseRate = round(Math.random() + 0.5);
  const energyRate = round(Math.random() + 0.5);

  return { dmgRate, speedRate, hpRate, defenseRate, energyRate };
};
