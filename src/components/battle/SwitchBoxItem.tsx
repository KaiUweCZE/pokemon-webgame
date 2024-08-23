"use client";
import HpBar from "@/components/HpBar";
import { Pokemon } from "@/types/pokemon";
import { generatePokemonIcon } from "@/utils/generatePokemonImage";
import Image from "next/image";
import { Dispatch, SetStateAction, useContext } from "react";
import infoIcon from "@/assets/images/icons/info.svg";
import { PokemonContext } from "@/contexts/PokemonContext";
import { NpcBattleState } from "@/types/enums/npcBattleState";
import { switchingTimer } from "@/utils/timer/switchingTimer";

interface SwitchBoxItemsProps {
  pokemon: Pokemon;
  setBattleState: Dispatch<SetStateAction<NpcBattleState>>;
}

const SwitchBoxItems = ({ pokemon, setBattleState }: SwitchBoxItemsProps) => {
  const icon = generatePokemonIcon(pokemon.name);
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error("context is missing");
  }

  const setPokemon = context.setCurrentPokemon;
  const currentPokemon = context.currentPokemon;

  const handleSwitchPokemon = () => {
    if (pokemon.id !== currentPokemon?.id && pokemon.actualHp > 0) {
      console.log("pokemons ids: ", pokemon.id, currentPokemon?.id);
      setBattleState(NpcBattleState.USER_SWITCHING_POKEMON);
      switchingTimer(() => setBattleState(NpcBattleState.BATTLE));
      setPokemon(pokemon);
    }
  };

  return (
    <li className="switch-box-item" onClick={handleSwitchPokemon}>
      <div>
        {icon && (
          <Image
            src={icon}
            alt={`icon of ${pokemon.name}`}
            width={32}
            height={32}
          />
        )}{" "}
        <span>{`${pokemon.name} lvl.${pokemon.level}`}</span>
        <HpBar actualHp={pokemon.actualHp} maximumHp={pokemon.hp} />
      </div>
      <Image
        className="switch-info"
        src={infoIcon}
        alt="info button"
        width={20}
        height={20}
      />
    </li>
  );
};

export default SwitchBoxItems;
