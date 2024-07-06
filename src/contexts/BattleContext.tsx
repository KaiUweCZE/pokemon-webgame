"use client";
import { PokemonBattle } from "@/types/pokemonBattle";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface BattleContextType {
  userPokemon: PokemonBattle | null;
  setUserPokemon: Dispatch<SetStateAction<PokemonBattle | null>>;
  enemyPokemon: PokemonBattle | null;
  setEnemyPokemon: Dispatch<SetStateAction<PokemonBattle | null>>;
}

interface BattleProviderProps {
  children: ReactNode;
}
export const BattleContext = createContext<BattleContextType | undefined>(
  undefined
);

export const BattleProvider = ({ children }: BattleProviderProps) => {
  const [userPokemon, setUserPokemon] = useState<PokemonBattle | null>(null);
  const [enemyPokemon, setEnemyPokemon] = useState<PokemonBattle | null>(null);
  const [step, setStep] = useState(0);

  const contextValues = {
    userPokemon,
    setUserPokemon,
    enemyPokemon,
    setEnemyPokemon,
    step,
    setStep,
  };
  return (
    <BattleContext.Provider value={contextValues}>
      {children}
    </BattleContext.Provider>
  );
};
