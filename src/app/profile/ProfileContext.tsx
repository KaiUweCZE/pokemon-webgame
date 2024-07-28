import { Pokemon } from "@/types/pokemon";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ProfileProviderProps {
  children: React.ReactNode;
}

interface ProfileContextType {
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  profilePokemon: Pokemon | null;
  setProfilePokemon: Dispatch<SetStateAction<Pokemon | null>>;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined
);

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [active, setActive] = useState("");
  const [error, setError] = useState(false);
  const [profilePokemon, setProfilePokemon] = useState<Pokemon | null>(null);

  const contextValues = {
    active,
    setActive,
    error,
    setError,
    profilePokemon,
    setProfilePokemon,
  };

  return (
    <ProfileContext.Provider value={contextValues}>
      {children}
    </ProfileContext.Provider>
  );
};
