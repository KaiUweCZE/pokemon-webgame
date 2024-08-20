import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { ProfileContext } from "../ProfileContext";
import { PokemonContext } from "@/contexts/PokemonContext";
import { Pokemon } from "@/types/pokemon";
import { prepareToEvolve } from "@/utils/prepareToEvolve";
import { evolvePokemon } from "../action";

interface Evolution {
  name: string;
  level: number;
}

export const useEvolvePokemon = () => {
  const context = useContext(ProfileContext);
  const pokemonContext = useContext(PokemonContext);
  const [isEvolving, setIsEvolving] = useState(false);

  const updatePokemonContext = (evolvedPokemon: Pokemon) => {
    if (!context?.profilePokemon) return;
    context.setProfilePokemon({
      ...context.profilePokemon,
      ...evolvedPokemon,
      actualHp: context.profilePokemon.actualHp,
      actualEnergy: context.profilePokemon.actualEnergy,
      actualExp: context.profilePokemon.actualExp,
    });

    if (pokemonContext?.userPokemons) {
      const newPokemons = pokemonContext.userPokemons.map((poke) =>
        poke.id === evolvedPokemon.id ? evolvedPokemon : poke
      );
      pokemonContext.setUserPokemons(newPokemons);
      pokemonContext.setIsEvolved(true);
    }
  };

  const handleEvolve = async (pokemon: Pokemon, evolution: Evolution) => {
    if (!evolution || !context?.profilePokemon) return;

    if (pokemon.level < evolution?.level) {
      context?.setMessage("It's level is too low");
      context?.setError(true);
      setTimeout(() => context?.setError(false), 2000);
      return;
    }

    // trigger animation
    setIsEvolving(true);
    setTimeout(() => {
      setIsEvolving(false);
    }, 4000);
    const newStats = prepareToEvolve(pokemon, evolution.name);
    if (newStats) {
      const evolvedPokemon = await evolvePokemon(pokemon.id, newStats);
      if (evolvedPokemon) {
        updatePokemonContext(evolvedPokemon);
      }
    }
  };

  return { handleEvolve, updatePokemonContext, isEvolving };
};
