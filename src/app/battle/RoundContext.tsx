"use client";
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface RoundContextType {
  round: number;
  setRound: Dispatch<SetStateAction<number>>;
}

export const RoundContext = createContext<RoundContextType | undefined>(
  undefined
);

interface RoundProviderProps {
  children: ReactNode;
}

export const RoundProvider = ({ children }: RoundProviderProps) => {
  const [round, setRound] = useState(0);

  return (
    <RoundContext.Provider value={{ round, setRound }}>
      {children}
    </RoundContext.Provider>
  );
};
