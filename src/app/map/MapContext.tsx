"use client";
import { Quest } from "@/types/quest";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface LocationChangeContextType {
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  loader: boolean;
  setLoader: Dispatch<SetStateAction<boolean>>;
  npc: string;
  setNpc: Dispatch<SetStateAction<string>>;
  npcMessage: string;
  setNpcMessage: Dispatch<SetStateAction<string>>;
  quest: Quest | null;
  setQuest: Dispatch<SetStateAction<Quest | null>>;
}

interface LocationProviderProps {
  children: ReactNode;
}

export const MapContext = createContext<LocationChangeContextType | null>(null);

export const MapProvider = ({ children }: LocationProviderProps) => {
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [npc, setNpc] = useState("");
  const [npcMessage, setNpcMessage] = useState("");
  const [quest, setQuest] = useState<Quest | null>(null);

  const contextValue = {
    error,
    setError,
    loader,
    setLoader,
    npc,
    setNpc,
    npcMessage,
    setNpcMessage,
    quest,
    setQuest,
  };

  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
};
