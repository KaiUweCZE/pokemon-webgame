"use client";
import { Pokemon } from "@/types/pokemon";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface PokemonProviderProps {
  children: ReactNode;
}

export interface PokemonContextType {
  currentPokemon: Pokemon | null;
  setCurrentPokemon: Dispatch<SetStateAction<Pokemon | null>>;
  userPokemons: Pokemon[];
  setUserPokemons: Dispatch<SetStateAction<Pokemon[]>>;
  pokemonsFromSix: Pokemon[];
  setPokemonsFromSix: Dispatch<SetStateAction<Pokemon[]>>;
}

export const PokemonContext = createContext<PokemonContextType | undefined>(
  undefined
);

export const PokemonProvider = ({ children }: PokemonProviderProps) => {
  const [userPokemons, setUserPokemons] = useState<Pokemon[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [pokemonsFromSix, setPokemonsFromSix] = useState<Pokemon[]>([]);

  if (pokemonsFromSix?.length >= 6) {
    console.log("you cannot add next pokemon");
  }

  const contextValues = {
    userPokemons,
    setUserPokemons,
    currentPokemon,
    setCurrentPokemon,
    pokemonsFromSix,
    setPokemonsFromSix,
  };
  return (
    <PokemonContext.Provider value={contextValues}>
      {children}
    </PokemonContext.Provider>
  );
};
