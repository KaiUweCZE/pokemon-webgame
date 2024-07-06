"use client";
import { User } from "@/types/user";
import { ReactNode, createContext, useEffect, useState } from "react";

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: Record<string, any> | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Load user from local storage only on initial render
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsInitialized(true);
    console.log("currentUser:", currentUser);
  }, []);

  useEffect(() => {
    // Only save to local storage after initial load
    if (isInitialized) {
      if (currentUser) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("currentUser");
      }
    }
  }, [currentUser, isInitialized]);

  const contextValue = {
    currentUser,
    setCurrentUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
