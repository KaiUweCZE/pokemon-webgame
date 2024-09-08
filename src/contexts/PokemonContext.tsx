"use client";
import { Item } from "@/types/item";
import { Pokemon } from "@/types/pokemon";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface PokemonProviderProps {
  children: ReactNode;
}

export interface PokemonWithOrder extends Pokemon {
  order: number;
}

export interface PokemonContextType {
  currentPokemon: Pokemon | null;
  setCurrentPokemon: Dispatch<SetStateAction<Pokemon | null>>;
  userPokemons: Pokemon[];
  setUserPokemons: Dispatch<SetStateAction<Pokemon[]>>;
  pokemonsFromSix: PokemonWithOrder[];
  setPokemonsFromSix: Dispatch<SetStateAction<PokemonWithOrder[]>>;
  setPokemonFirst: (pokemonId: string) => void;
  isEvolved: boolean;
  setIsEvolved: Dispatch<SetStateAction<boolean>>;
  isCombatReady: boolean;
  exps: number;
  setExps: Dispatch<SetStateAction<number>>;
  reward: Item | null;
  setReward: Dispatch<SetStateAction<Item | null>>;
  newLevel: boolean;
  setNewLevel: Dispatch<SetStateAction<boolean>>;
}

export const PokemonContext = createContext<PokemonContextType | undefined>(
  undefined
);

export const PokemonProvider = ({ children }: PokemonProviderProps) => {
  const [userPokemons, setUserPokemons] = useState<Pokemon[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [pokemonsFromSix, setPokemonsFromSix] = useState<PokemonWithOrder[]>(
    []
  );
  const [isEvolved, setIsEvolved] = useState(false);
  const [exps, setExps] = useState(0);
  const [reward, setReward] = useState<Item | null>(null);
  const [newLevel, setNewLevel] = useState(false);

  const isCombatReady = pokemonsFromSix.some((pokemon) => pokemon.actualHp > 0);

  const setPokemonFirst = (pokemonId: string) => {
    setPokemonsFromSix((prevSorted) => {
      const pokemon = prevSorted.find((p) => p.id === pokemonId);
      if (!pokemon || pokemon.order === 0) return prevSorted;
      const pokemonIndex = pokemon.order;
      const updatedSort = prevSorted.map((p) => {
        if (p.id === pokemon.id) {
          return { ...p, order: 0 };
        }
        if (p.order === 0) {
          return { ...p, order: pokemonIndex };
        }
        return p;
      });
      return updatedSort.sort((a, b) => a.order - b.order);
    });
  };

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
    reward,
    setReward,
    exps,
    setExps,
    newLevel,
    setNewLevel,
    setPokemonFirst,
  };
  return (
    <PokemonContext.Provider value={contextValues}>
      {children}
    </PokemonContext.Provider>
  );
};
