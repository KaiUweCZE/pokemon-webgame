"use client";
import { Pokemon } from "@/types/pokemon";
import { useContext } from "react";
import { ProfileContext } from "../ProfileContext";
import Image from "next/image";
import closeIcon from "@/assets/images/icons/close.svg";
import { pokemonBattleData } from "@/data/pokemonBattleData";
import FullCardStats from "./FullCardStats";
import FullCardAttacksList from "./FullCardAttackList";
import FullCardPokemonImg from "./FullCardPokemonImg";
import FullCardButtons from "./FullCardButtons";
import { useAddToSix } from "../hooks/useAddToSix";
import { useDeletePokemon } from "../hooks/useDeletePokemon";
import { useEvolvePokemon } from "../hooks/useEvolvePokemon";
import evolutionAnimation from "@/assets/images/attacks/evolution.gif";
import { getAttacksFromNames } from "@/utils/battle-function/getAttacksFromNames";
import ErrorMessage from "@/components/ErrorMessage";

interface PokemonProps {
  pokemon: Pokemon;
}

const PokemonFullCard = ({ pokemon }: PokemonProps) => {
  const context = useContext(ProfileContext);
  const addToSix = useAddToSix();
  const deletePokemon = useDeletePokemon();
  const { isEvolving, handleEvolve } = useEvolvePokemon();
  const evolution = pokemonBattleData.find(
    (poke) => poke.name === pokemon.name
  )?.evolution;

  const handleAddToSix = () => addToSix(pokemon);
  const handleDelete = () => deletePokemon(pokemon.id);
  const attackData = getAttacksFromNames(pokemon.attacks);

  return (
    <>
      <div className="full-card">
        <div className="left-side">
          {isEvolving && (
            <Image
              className="evolution"
              src={evolutionAnimation}
              alt="evolution of pokemon"
              width={150}
              height={150}
            />
          )}
          <FullCardPokemonImg name={pokemon.name} isEvolving={isEvolving} />
          <h2>{pokemon.name}</h2>
          <FullCardAttacksList attacks={attackData} />
        </div>
        <FullCardStats pokemon={pokemon} />
        <FullCardButtons
          onAddToSix={handleAddToSix}
          onDelete={handleDelete}
          onEvolve={
            evolution ? () => handleEvolve(pokemon, evolution) : undefined
          }
          canEvolve={!!evolution}
        />
        <Image
          className="close"
          src={closeIcon}
          alt="close icon"
          width={16}
          onClick={() => context?.setActive("")}
        />
      </div>
      {context?.error && <ErrorMessage message={context.message} />}
    </>
  );
};

export default PokemonFullCard;
