import { PokemonBattle } from "@/types/pokemonBattle";
import { StaticImageData } from "next/image";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface NpcBattleProps {
  children: React.ReactNode;
}

interface NpcBattleContextProps {
  oponent: Oponent | null;
  setOponent: Dispatch<SetStateAction<Oponent | null>>;
  oponentPokemons: PokemonBattle[] | null;
  setOponentPokemons: Dispatch<SetStateAction<PokemonBattle[] | null>>;
  currentOponentPokemon: PokemonBattle | null;
  setCurrentOponentPokemon: Dispatch<SetStateAction<PokemonBattle | null>>;
  battleText: string;
  setBattleText: Dispatch<SetStateAction<string>>;
  startBattle: boolean;
  setStartBattle: Dispatch<SetStateAction<boolean>>;
}

interface Oponent {
  id: number;
  name: string;
  message: string;
  img: StaticImageData;
  stadiumTrainer: boolean;
  pokemons: PokemonBattle[] | undefined;
}

export const NpcBattleContext = createContext<
  NpcBattleContextProps | undefined
>(undefined);

export const NpcBattleProvider = ({ children }: NpcBattleProps) => {
  const [oponent, setOponent] = useState<Oponent | null>(null);
  const [oponentPokemons, setOponentPokemons] = useState<
    PokemonBattle[] | null
  >(null);
  const [currentOponentPokemon, setCurrentOponentPokemon] =
    useState<PokemonBattle | null>(null);
  const [user, setUser] = useState();
  const [startBattle, setStartBattle] = useState(false);
  const [battleText, setBattleText] = useState("");

  useEffect(() => {
    if (oponent?.pokemons) {
      setOponentPokemons(oponent?.pokemons);
    }
  }, [oponent]);

  const contextValues = {
    oponent,
    setOponent,
    oponentPokemons,
    setOponentPokemons,
    currentOponentPokemon,
    setCurrentOponentPokemon,
    battleText,
    setBattleText,
    startBattle,
    setStartBattle,
  };
  return (
    <NpcBattleContext.Provider value={contextValues}>
      {children}
    </NpcBattleContext.Provider>
  );
};
