"use client";
import UserPokemon from "@/app/profile/UserPokemon";
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

interface PokemonContextType {
  userPokemons: Pokemon[] | null;
  setUserPokemons: Dispatch<SetStateAction<Pokemon[]>>;
}

export const PokemonContext = createContext<PokemonContextType | undefined>(
  undefined
);

export const PokemonProvider = ({ children }: PokemonProviderProps) => {
  const [userPokemons, setUserPokemons] = useState<Pokemon[]>([]);
  const contextValues = {
    userPokemons,
    setUserPokemons,
  };
  return (
    <PokemonContext.Provider value={contextValues}>
      {children}
    </PokemonContext.Provider>
  );
};
