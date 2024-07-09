import { pokemonBattleData } from "@/data/pokemonBattleData";
import { generatePokemonsRate } from "./generatePokemonsRate";

export const randomLevel = () => {
  return Math.floor(Math.random() * 21);
};

export const generatePokemon = (pokemonId: number) => {
  const data = pokemonBattleData.find((pokemon) => pokemon.id === pokemonId);
  const level = randomLevel();
  console.log("data: ", data);
  console.log("level: ", level);

  // generate pokemon's potentional, each ability can be in range 0.5 - 1.5
  const { hpRate, defenseRate, speedRate, dmgRate, energyRate } =
    generatePokemonsRate();

  if (!data) {
    throw new Error("Pokemon not found");
  }

  const pokemon = {
    //...data,
    name: data.name,
    type: data.type,
    level: parseFloat(level.toFixed(2)),
    damage: parseFloat(
      (data.damage * Math.pow(1.05, level) * dmgRate).toFixed(2)
    ),
    hp: parseFloat((data.hp * Math.pow(1.05, level) * hpRate).toFixed(2)),
    actualHp: parseFloat((data.hp * Math.pow(1.05, level) * hpRate).toFixed(2)),
    defense: parseFloat(
      (data.defense * Math.pow(1.05, level) * defenseRate).toFixed(2)
    ),
    speed: parseFloat(
      (data.speed * Math.pow(1.05, level) * speedRate).toFixed(2)
    ),
    energy: parseFloat(
      (data.energy * Math.pow(1.05, level) * energyRate).toFixed(2)
    ),
    expToLevel: Math.ceil(data.expToLevel * Math.pow(1.5, level)),
    expForKill: Math.ceil(data.expForKill * Math.pow(1.5, level)),
  };

  return pokemon;
};
