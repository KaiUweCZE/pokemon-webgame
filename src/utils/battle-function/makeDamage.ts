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
  pokemonTypes.forEach((type) => {
    if (attackTypeData?.advantage.includes(type)) {
      multiplier *= 2;
    } else if (attackTypeData?.disadvantage.includes(type)) {
      multiplier *= 0.5;
    }
  });
  const resultDamage = baseDefense * 0.5 - (baseAttack + damage) * multiplier;
  const newHp = hp + resultDamage < 0 ? hp + resultDamage : hp - 1;
  console.log(
    "defense: ",
    baseDefense,
    "result damage : ",
    resultDamage,
    "raw attack: ",
    (baseAttack + damage) * multiplier,
    "newhp: ",
    newHp
  );

  return newHp;
};
