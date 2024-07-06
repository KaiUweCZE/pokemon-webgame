export const makeDamage = (damage: number, hp: number) => {
  const newHp = hp - damage;

  return newHp;
};
