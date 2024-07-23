"use client";
import { Attack } from "@/types/attack";
import { Pokemon } from "@/types/pokemon";
import { PokemonBattle } from "@/types/pokemonBattle";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface isCatch {
  underway: boolean;
  isSucces: boolean;
}

export interface BattleContextType {
  userPokemon: Pokemon | null;
  setUserPokemon: Dispatch<SetStateAction<Pokemon | null>>;
  enemyPokemon: PokemonBattle | null;
  setEnemyPokemon: Dispatch<SetStateAction<PokemonBattle | null>>;
  isCatching: isCatch;
  setIsCatching: Dispatch<SetStateAction<isCatch>>;
  attackAnimation: boolean;
  setAttackAnimation: Dispatch<SetStateAction<boolean>>;
  attack: Attack | null;
  setAttack: Dispatch<SetStateAction<Attack | null>>;
}

interface BattleProviderProps {
  children: ReactNode;
}
export const BattleContext = createContext<BattleContextType | undefined>(
  undefined
);

export const BattleProvider = ({ children }: BattleProviderProps) => {
  const [userPokemon, setUserPokemon] = useState<Pokemon | null>(null);
  const [enemyPokemon, setEnemyPokemon] = useState<PokemonBattle | null>(null);
  const [step, setStep] = useState(0);
  const [isCatching, setIsCatching] = useState({
    underway: false,
    isSucces: false,
  });
  const [attackAnimation, setAttackAnimation] = useState(false);
  const [attack, setAttack] = useState<Attack | null>(null);

  const contextValues = {
    userPokemon,
    setUserPokemon,
    enemyPokemon,
    setEnemyPokemon,
    step,
    setStep,
    isCatching,
    setIsCatching,
    attackAnimation,
    setAttackAnimation,
    attack,
    setAttack,
  };
  return (
    <BattleContext.Provider value={contextValues}>
      {children}
    </BattleContext.Provider>
  );
};
