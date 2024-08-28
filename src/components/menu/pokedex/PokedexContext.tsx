"use client";

import { pokemonBattleData } from "@/data/pokemonBattleData";
import { PokemonData } from "@/types/pokemonData";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface PokedexContextType {
  pokedexPokemons: PokemonData[];
  setPokedexPokemons: Dispatch<SetStateAction<PokemonData[]>>;
}

export const PokedexContext = createContext<PokedexContextType | undefined>(
  undefined
);

interface ProviderProps {
  children: ReactNode;
}

export const PokedexProvider = ({ children }: ProviderProps) => {
  const [pokedexPokemons, setPokedexPokemons] =
    useState<PokemonData[]>(pokemonBattleData);

  const contextValues = {
    pokedexPokemons,
    setPokedexPokemons,
  };

  return (
    <PokedexContext.Provider value={contextValues}>
      {children}
    </PokedexContext.Provider>
  );
};
