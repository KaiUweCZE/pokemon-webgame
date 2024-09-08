import { typesOfPokemon } from "@/data/typesOfPokemonData";

export const makeDamage = (
  attackDamage: number,
  defendingPokemonHp: number,
  defendingPokemonTypes: string[],
  attackType: string,
  attackingPokemonDamage: number,
  defendingPokemonDefense: number
) => {
  let multiplier = 1;
  const attackTypeData = typesOfPokemon.find(
    (type) => type.name === attackType
  );
  // Adjust the multiplier based on the type matchups
  // for example fire has advantage against water => damage * 2
  defendingPokemonTypes.forEach((type) => {
    if (attackTypeData?.advantage.includes(type)) {
      multiplier *= 2;
    } else if (attackTypeData?.disadvantage.includes(type)) {
      multiplier *= 0.5;
    }
  });

  // .5 after defendingPokemonDefense is test contstant,
  const resultDamage = Math.min(
    defendingPokemonDefense * 0.5 -
      (attackingPokemonDamage + attackDamage) * multiplier,
    -1
  );
  // check if denfense is not bigger then attack to avoid adding defendingPokemonHp after attack
  // if defense is bigger damage will be only - 1
  const newHp = Math.max(defendingPokemonHp + resultDamage, 0);
  /*console.log(
    "pokemon hp: ",
    defendingPokemonHp,

    "overall damage: ",
    (attackingPokemonDamage + attackDamage) * multiplier,
    "defense: ",
    defendingPokemonDefense,
    "result of damage : ",
    resultDamage,
    "newhp: ",
    newHp,
    "attack advanatage: ",
    multiplier
  );*/

  return newHp;
};
