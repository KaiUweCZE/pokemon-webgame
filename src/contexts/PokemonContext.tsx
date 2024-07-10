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

interface PokemonContextType {
  userPokemons: Pokemon[] | null;
  setUserPokemons: Dispatch<SetStateAction<Pokemon[]>>;
  pokemonsFromSix: Pokemon[] | null;
  setPokemonsFromSix: Dispatch<SetStateAction<Pokemon[]>>;
}

export const PokemonContext = createContext<PokemonContextType | undefined>(
  undefined
);

export const PokemonProvider = ({ children }: PokemonProviderProps) => {
  const [userPokemons, setUserPokemons] = useState<Pokemon[]>([]);
  const [pokemonsFromSix, setPokemonsFromSix] = useState<Pokemon[]>([]);

  if (pokemonsFromSix?.length >= 6) {
    console.log("you cannot add next pokemon");
  }

  const contextValues = {
    userPokemons,
    setUserPokemons,
    pokemonsFromSix,
    setPokemonsFromSix,
  };
  return (
    <PokemonContext.Provider value={contextValues}>
      {children}
    </PokemonContext.Provider>
  );
};
