"use client";
import { Pokemon } from "@/types/pokemon";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
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
  isEvolved: boolean;
  setIsEvolved: Dispatch<SetStateAction<boolean>>;
  isCombatReady: boolean;
  //setIsCombatReady: Dispatch<SetStateAction<boolean>>;
}

export const PokemonContext = createContext<PokemonContextType | undefined>(
  undefined
);

export const PokemonProvider = ({ children }: PokemonProviderProps) => {
  const [userPokemons, setUserPokemons] = useState<Pokemon[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [pokemonsFromSix, setPokemonsFromSix] = useState<Pokemon[]>([]);
  const [isEvolved, setIsEvolved] = useState(false);
  //const [isCombatReady, setIsCombatReady] = useState(false);

  const isCombatReady = useMemo(() => {
    return pokemonsFromSix.some((pokemon) => pokemon.actualHp > 0);
  }, [pokemonsFromSix]);

  if (pokemonsFromSix?.length >= 6) {
    console.log("you cannot add next pokemon");
  }

  const contextValues: PokemonContextType = {
    userPokemons,
    setUserPokemons,
    currentPokemon,
    setCurrentPokemon,
    pokemonsFromSix,
    setPokemonsFromSix,
    isEvolved,
    setIsEvolved,
    isCombatReady,
    //setIsCombatReady,
  };
  return (
    <PokemonContext.Provider value={contextValues}>
      {children}
    </PokemonContext.Provider>
  );
};
