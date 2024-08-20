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

  const handleAddToSix = () => addToSix(pokemon.id);
  const handleDelete = () => deletePokemon(pokemon.id);

  return (
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
        <FullCardAttacksList attacks={pokemon.attacks} />
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
  );
};

export default PokemonFullCard;

/*


  const handleDelete = async () => {
    try {
      if (user && !data?.user.userSix.includes(pokemon.id)) {
        const updatedUser = await removePokemon(pokemon.id, user?.name);
        if (updatedUser) {
          await update({
            ...data,
            user: {
              ...data?.user,
              PokemonIds: updatedUser.pokemonIds,
            },
          });
        }
      } else {
        context?.setMessage("You cannot delete pokemon from your six");
        context?.setError(true);
        setTimeout(() => {
          context?.setError(false);
        }, 2000);
      }
    } catch (err) {
      console.error("error occurs while deleting", err);
    }
  };


  const handleEvolvePokemon = async () => {
    if (!evolution || !context?.profilePokemon) return;
    if (pokemon.level < evolution?.level) {
      context?.setMessage("It's level is too low");
      context?.setError(true);
      setTimeout(() => {
        context?.setError(false);
      }, 2000);
    } else {
      setEvolving(true);
      const newStats = prepareToEvolve(pokemon, evolution.name);
      if (newStats) {
        const evolvedpokemon = await evolvePokemon(pokemon.id, newStats);
        console.log("New Stats: ", newStats, evolvedpokemon);
        context?.setProfilePokemon({
          id: context.profilePokemon?.id,
          name: newStats.name,
          type: newStats.type,
          level: newStats.level,
          hp: newStats.hp,
          actualHp: context.profilePokemon.actualHp,
          damage: newStats.damage,
          energy: newStats.energy,
          actualEnergy: context.profilePokemon.actualEnergy,
          defense: newStats.defense,
          speed: newStats.speed,
          expToLevel: newStats.expToLevel,
          actualExp: context.profilePokemon.actualExp,
          attacks: context.profilePokemon.attacks,
          abilities: context.profilePokemon.abilities,
          userId: context.profilePokemon.userId,
        });
        const pokemons = pokemonContext?.userPokemons;

        if (pokemons) {
          const newPokemons = pokemons.map((poke) =>
            poke.id === pokemon.id ? evolvedpokemon : poke
          ) as Pokemon[];

          pokemonContext.setUserPokemons(newPokemons);
          pokemonContext.setIsEvolved(true);
          setTimeout(() => {
            console.log("user pokemons: ", pokemonContext.userPokemons);
          }, 100);
        }
      }
    }
  };

*/
