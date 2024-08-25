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
import { BattleMenuState } from "@/types/enums/enumBattleMenu";
import { BattleState } from "@/types/enums/battleState";

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
  menuOption: BattleMenuState;
  setMenuOption: Dispatch<SetStateAction<BattleMenuState>>;
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
  battleState: BattleState;
  setBattleState: Dispatch<SetStateAction<BattleState>>;
  change: number;
  setChange: Dispatch<SetStateAction<number>>;
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
  const [menuOption, setMenuOption] = useState(BattleMenuState.DEFAULT);
  const [startBattle, setStartBattle] = useState(false);
  const [battleText, setBattleText] = useState("");
  const [attack, setAttack] = useState<Attack | null>(null);
  const [attackAnimation, setAttackAnimation] = useState(false);
  const [oponentAttack, setOponentAttack] = useState<Attack | null>(null);
  const [oponentAttackAnimation, setOponentAttackAnimation] = useState(false);
  const [stopBattle, setStopBattle] = useState(false);
  const [battleState, setBattleState] = useState<BattleState>(
    BattleState.NOT_STARTED
  );
  const [change, setChange] = useState(0);

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
    battleState,
    setBattleState,
    change,
    setChange,
  };

  return (
    <NpcBattleContext.Provider value={contextValues}>
      {children}
    </NpcBattleContext.Provider>
  );
};
