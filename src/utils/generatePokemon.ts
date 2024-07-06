import { pokemonBattleData } from "@/data/pokemonBattleData";

export const randomLevel = () => {
  return Math.floor(Math.random() * 21);
};

export const generatePokemon = (pokemonId: number) => {
  const data = pokemonBattleData.find((pokemon) => pokemon.id === pokemonId);
  const level = randomLevel();
  console.log("data: ", data);
  console.log("level: ", level);

  if (!data) {
    throw new Error("Pokemon not found");
  }

  const pokemon = {
    //...data,
    name: data.name,
    level: parseFloat(level.toFixed(2)),
    damage: parseFloat((data.damage * Math.pow(1.05, level)).toFixed(2)),
    hp: parseFloat((data.hp * Math.pow(1.05, level)).toFixed(2)),
    actualHp: parseFloat((data.hp * Math.pow(1.05, level)).toFixed(2)),
    defense: parseFloat((data.defense * Math.pow(1.05, level)).toFixed(2)),
  };

  return pokemon;
};
