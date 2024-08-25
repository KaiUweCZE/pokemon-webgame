"use client";
import { Pokemon } from "@/types/pokemon";
import { getSix } from "@/utils/battle-function/getSix";
import Image from "next/image";
import closeIcon from "@/assets/images/icons/close.svg";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SwitchBoxItems from "./SwitchBoxItem";
import { BattleMenuState } from "@/types/enums/enumBattleMenu";
import { useSession } from "next-auth/react";
import { useBattleContext } from "@/hooks/useBattleContext";

interface SwitchBoxProps {
  setMenuChoice: Dispatch<SetStateAction<BattleMenuState>>;
}

const SwitchBox = ({ setMenuChoice }: SwitchBoxProps) => {
  const context = useBattleContext();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const { data } = useSession();

  useEffect(() => {
    const getPokemons = async () => {
      if (data?.user.name) {
        const newPokemons = await getSix(data.user.name);
        if (newPokemons) {
          setPokemons(newPokemons);
        }
      }
    };

    getPokemons();
  }, []);

  return (
    <div className="switch-box">
      <ul>
        {pokemons.map((pokemon) => (
          <SwitchBoxItems
            key={pokemon.id}
            pokemon={pokemon}
            battleState={context.battleState}
            setBattleState={context.setBattleState}
          />
        ))}
      </ul>
      <Image
        className="close-icon"
        src={closeIcon}
        alt="close icon"
        width={16}
        height={16}
        onClick={() => setMenuChoice(BattleMenuState.DEFAULT)}
      />
    </div>
  );
};

export default SwitchBox;
