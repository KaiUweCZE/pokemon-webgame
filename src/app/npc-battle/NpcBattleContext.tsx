import { Attack } from "@/types/attack";
import { PokemonBattle } from "@/types/pokemonBattle";
import { StaticImageData } from "next/image";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { generateNpcPokemons } from "./npc-utils/generateNpcPokemonStats";
import { oponentPokemon } from "@/data/npcPokemons";
import { BattleMenu } from "@/types/enums/enumBattleMenu";

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
  menuOption: BattleMenu;
  setMenuOption: Dispatch<SetStateAction<BattleMenu>>;
  attack: Attack | null;
  setAttack: Dispatch<SetStateAction<Attack | null>>;
  attackAnimation: boolean;
  setAttackAnimation: Dispatch<SetStateAction<boolean>>;
  oponentAttack: Attack | null;
  setOponentAttack: Dispatch<SetStateAction<Attack | null>>;
  oponentAttackAnimation: boolean;
  setOponentAttackAnimation: Dispatch<SetStateAction<boolean>>;
  stopBattle: boolean;
  setStopBattle: Dispatch<SetStateAction<boolean>>;
}

interface Oponent {
  id: number;
  name: string;
  message: string;
  img: StaticImageData;
  stadiumTrainer: boolean;
  pokemons: oponentPokemon[] | undefined;
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
  const [menuOption, setMenuOption] = useState(BattleMenu.DEFAULT);
  const [startBattle, setStartBattle] = useState(false);
  const [battleText, setBattleText] = useState("");
  const [attack, setAttack] = useState<Attack | null>(null);
  const [attackAnimation, setAttackAnimation] = useState(false);
  const [oponentAttack, setOponentAttack] = useState<Attack | null>(null);
  const [oponentAttackAnimation, setOponentAttackAnimation] = useState(false);
  const [stopBattle, setStopBattle] = useState(false);

  useEffect(() => {
    if (oponent?.pokemons) {
      const buildedPokemons = oponent.pokemons
        .map(generateNpcPokemons)
        .filter((pokemon): pokemon is PokemonBattle => pokemon !== null);
      setOponentPokemons(buildedPokemons);
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
    menuOption,
    setMenuOption,
    attack,
    setAttack,
    attackAnimation,
    setAttackAnimation,
    oponentAttack,
    setOponentAttack,
    oponentAttackAnimation,
    setOponentAttackAnimation,
    stopBattle,
    setStopBattle,
  };

  return (
    <NpcBattleContext.Provider value={contextValues}>
      {children}
    </NpcBattleContext.Provider>
  );
};
