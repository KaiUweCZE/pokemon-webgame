"use client";
import { BattleContext } from "@/contexts/BattleContext";
import { Pokemon } from "@/types/pokemon";
import { generatePokemonIcon } from "@/utils/generatePokemonImage";
import Image from "next/image";
import { useContext } from "react";

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
    <li onClick={() => setPokemon(pokemon)}>
      {" "}
      {icon && (
        <Image
          src={icon}
          alt={`icon of ${pokemon.name}`}
          width={32}
          height={32}
        />
      )}{" "}
      {pokemon.name}
    </li>
  );
};

export default SwitchBoxItems;
