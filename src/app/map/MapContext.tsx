"use client";
import React, { createContext, useContext, useState } from "react";
import { changeLocation } from "./action";
import { useSession } from "next-auth/react";

interface LocationChangeContextType {
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LocationProviderProps {
  children: React.ReactNode;
}

export const MapContext = createContext<LocationChangeContextType | null>(null);

export const MapProvider = ({ children }: LocationProviderProps) => {
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const contextValue = {
    error,
    setError,
    loader,
    setLoader,
  };

  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
};
