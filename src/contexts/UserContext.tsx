"use client";
import { User } from "@/types/user";
import { useSession } from "next-auth/react";
import { ReactNode, createContext, useEffect, useState } from "react";

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: Record<string, any> | null) => void;
  isLog: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLog, setIsLog] = useState(false);
  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      setIsLog(false);
    } else {
      setIsLog(true);
    }
  }, [status]);

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
    isLog,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
