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
  quests: Quest[] | null;
  setQuests: Dispatch<SetStateAction<Quest[] | null>>;
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
  const [quests, setQuests] = useState<Quest[] | null>(null);
  const [questVisible, setQuestVisible] = useState(false);

  const contextValue = {
    error,
    setError,
    loader,
    setLoader,
    npc,
    setNpc,
    npcMessage,
    setNpcMessage,
    quests,
    setQuests,
  };

  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
};
