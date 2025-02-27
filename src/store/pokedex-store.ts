"use client";
import { Store } from "@tanstack/store";
import { useStore } from "@tanstack/react-store";
import { Pokemon, PokemonName, PokemonType } from "@/types/pokemon";
import { PokemonData, pokemonsData } from "@/data/pokemons/pokemon-data";
import PokedexPokemon from "@/components/header-modals/pokedex/pokedex-pokemon";

export interface PokedexPokemon {
  id: number;
  name: PokemonName;
  types: PokemonType[];
}

export const pokemonToPokedexPokemon = (pokemon: PokemonData): PokedexPokemon => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types,
  };
};

export const pokemonToPokemonData = (pokemon: PokemonName): PokemonData => {
  return pokemonsData.find((p) => p.name === pokemon)!;
};

export interface PokedexStore {
  pokedexPokemons: PokedexPokemon[];
  filteredPokemons: PokedexPokemon[];
  loading: boolean;
  error: boolean;
  currentPokemon: PokemonData;
}

export const pokedexStore = new Store<PokedexStore>({
  pokedexPokemons: pokemonsData.map(pokemonToPokedexPokemon),
  filteredPokemons: pokemonsData.map(pokemonToPokedexPokemon),
  loading: false,
  error: false,
  currentPokemon: pokemonsData[0],
});

export const setCurrentPokemon = (pokemon: PokedexPokemon) => {
  pokedexStore.setState((state) => ({
    ...state,
    currentPokemon: pokemonToPokemonData(pokemon.name),
  }));
};

export const usePokedexStore = () => {
  const state = useStore(pokedexStore);

  return {
    state,
    pokemons: state.pokedexPokemons,
    filteredPokemons: state.filteredPokemons,
    loading: state.loading,
    error: state.error,
    currentPokemon: state.currentPokemon,
  };
};
