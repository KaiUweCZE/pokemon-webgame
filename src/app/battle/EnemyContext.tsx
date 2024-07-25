"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface EnemyContextType {
  enemyDamage: number;
  setEnemyDamage: Dispatch<SetStateAction<number>>;
}

export const EnemyContext = createContext<EnemyContextType | undefined>(
  undefined
);

interface EnemyProviderProps {
  children: ReactNode;
}

export const EnemyProvider = ({ children }: EnemyProviderProps) => {
  const [enemyDamage, setEnemyDamage] = useState(0);

  const contextValue = {
    enemyDamage,
    setEnemyDamage,
  };

  return (
    <EnemyContext.Provider value={contextValue}>
      {children}
    </EnemyContext.Provider>
  );
};
