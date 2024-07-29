import { typesOfPokemon } from "@/data/typesOfPokemonData";

export const makeDamage = (
  damage: number,
  hp: number,
  pokemonTypes: string[],
  attackType: string,
  baseAttack: number,
  baseDefense: number
) => {
  let multiplier = 1;
  const attackTypeData = typesOfPokemon.find(
    (type) => type.name === attackType
  );
  // Adjust the multiplier based on the type matchups
  // for example fire has advantage against water => damage * 2
  pokemonTypes.forEach((type) => {
    if (attackTypeData?.advantage.includes(type)) {
      multiplier *= 2;
    } else if (attackTypeData?.disadvantage.includes(type)) {
      multiplier *= 0.5;
    }
  });
  const resultDamage = baseDefense * 0.5 - (baseAttack + damage) * multiplier;
  // check if denfense is not bigger then attack to avoid adding hp after attack
  // if defense is bigger damage will be only - 1
  const newHp = resultDamage < 0 ? hp + resultDamage : hp - 1;
  console.log(
    "pokemon hp: ",
    hp,
    "defense: ",
    baseDefense,
    "result damage : ",
    resultDamage,
    "raw attack: ",
    (baseAttack + damage) * multiplier,
    "newhp: ",
    newHp,
    "attack advanatage: ",
    multiplier
  );

  return newHp;
};
