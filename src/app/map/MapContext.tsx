"use client";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { changeLocation } from "./action";
import { useSession } from "next-auth/react";

interface LocationChangeContextType {
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  loader: boolean;
  setLoader: Dispatch<SetStateAction<boolean>>;
  npc: string;
  setNpc: Dispatch<SetStateAction<string>>;
}

interface LocationProviderProps {
  children: ReactNode;
}

export const MapContext = createContext<LocationChangeContextType | null>(null);

export const MapProvider = ({ children }: LocationProviderProps) => {
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [npc, setNpc] = useState("");

  const contextValue = {
    error,
    setError,
    loader,
    setLoader,
    npc,
    setNpc,
  };

  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
};
