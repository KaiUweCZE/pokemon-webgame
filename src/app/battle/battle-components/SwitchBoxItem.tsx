"use client";
import HpBar from "@/components/HpBar";
import { BattleContext } from "@/contexts/BattleContext";
import { Pokemon } from "@/types/pokemon";
import { generatePokemonIcon } from "@/utils/generatePokemonImage";
import Image from "next/image";
import { useContext } from "react";
import infoIcon from "@/assets/images/icons/info.svg";

interface SwitchBoxItemsProps {
  pokemon: Pokemon;
}

const SwitchBoxItems = ({ pokemon }: SwitchBoxItemsProps) => {
  const icon = generatePokemonIcon(pokemon.name);
  const context = useContext(BattleContext);

  if (!context) {
    throw new Error("context is missing");
  }

  const setPokemon = context.setUserPokemon;
  return (
    <li className="switch-box-item" onClick={() => setPokemon(pokemon)}>
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
