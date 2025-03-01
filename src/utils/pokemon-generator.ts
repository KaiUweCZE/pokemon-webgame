// utils/pokemon-generator.ts
import { EnemyPokemon, PokemonCreate, PokemonName, PokemonType } from "@/types/pokemon";
import { pokemonsData } from "@/data/pokemons/pokemon-data";
import { randomizeValue } from "./randomize-value";
import { applyLevelToStats, isPokemonShiny } from "./pokemon-stats";
import { AreaType } from "@/data/locations/location-areas";
import { pokemonsImg } from "@/images";

interface StaticPokemonData {
  id: number;
  name: string;
  type: string[];
  damage: number;
  defense: number;
  speed: number;
  hp: number;
  energy: number;
  attacks: string[];
}

// get random pokemon name from location areas
export const randomPokemonFromLocation = (
  locationAreas: AreaType
): { name: PokemonName; level: number } => {
  const randomPokemon = {
    name: locationAreas.pokemons[Math.floor(Math.random() * locationAreas.pokemons.length)],
    level:
      locationAreas.min + Math.floor(Math.random() * (locationAreas.max - locationAreas.min + 1)),
  };
  return randomPokemon;
};

export const generatePokemon = (pokemonName: string, level: number = 1): PokemonCreate => {
  const baseData = pokemonsData.find((p) => p.name === pokemonName);

  if (!baseData) {
    throw new Error(`Pokemon ${pokemonName} not found in data`);
  }

  const baseStats: PokemonCreate = {
    name: baseData.name,
    types: baseData.types as PokemonType[],
    attacks: baseData.attacks.map((e) => e.attack),
    abilities: [],
    shiny: isPokemonShiny(),
    maxHp: randomizeValue(baseData.hp),
    maxEnergy: randomizeValue(baseData.energy),
    damage: randomizeValue(baseData.damage),
    defense: randomizeValue(baseData.defense),
    speed: randomizeValue(baseData.speed),
    expToNextLevel: baseData.expToLevel,
    level: 1,
  };

  return level > 1 ? applyLevelToStats(baseStats, level) : baseStats;
};

export const pokemonCreateToEnemyPokemon = (pokemon: PokemonCreate): EnemyPokemon => {
  return {
    ...pokemon,
    types: pokemon.types,
    level: pokemon.level || 99,
    shiny: pokemon.shiny || false,
    attacks: pokemon.attacks || ["tackle"],
    abilities: pokemon.abilities || [],
    currentHp: pokemon.maxHp || 10,
    maxHp: pokemon.maxHp || 10,
    maxEnergy: pokemon.maxEnergy || 10,
    damage: pokemon.damage || 10,
    defense: pokemon.defense || 10,
    speed: pokemon.speed || 10,
    currentEnergy: pokemon.maxEnergy || 10,
    image: pokemonsImg[pokemon.name],
  };
};

export const generateWildPokemon = (locationAreas: AreaType) => {
  const randomPokemon = randomPokemonFromLocation(locationAreas);
  const generatedPokemon = generatePokemon(randomPokemon.name, randomPokemon.level);

  return pokemonCreateToEnemyPokemon(generatedPokemon);
};
