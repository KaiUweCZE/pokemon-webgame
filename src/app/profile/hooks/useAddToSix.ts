import { useSession } from "next-auth/react";
import { useContext } from "react";
import { ProfileContext } from "../ProfileContext";
import { addPokemonToSix } from "../action";
import { PokemonContext } from "@/contexts/PokemonContext";
import { Pokemon } from "@/types/pokemon";

export const useAddToSix = () => {
  const { data, update } = useSession();
  const context = useContext(ProfileContext);
  const pokemonContext = useContext(PokemonContext);

  const addToSix = async (pokemon: Pokemon) => {
    const user = data?.user;
    if (!user || !pokemonContext) return;

    const { setPokemonsFromSix, pokemonsFromSix } = pokemonContext;
    try {
      if (pokemonsFromSix.length >= 6) {
        context?.setMessage(`You already have 6 Pokémon in your Six`);
        throw new Error(`You already have 6 Pokémon in your Six`);
      }
      if (pokemonsFromSix.some((p) => p.id === pokemon.id)) {
        context?.setMessage(`This ${pokemon.name} is already in your Six `);
        throw new Error(`This Pokémon is already in your Six ${pokemon.name}`);
      }

      setPokemonsFromSix([
        ...pokemonsFromSix,
        { ...pokemon, order: pokemonsFromSix.length },
      ]);
      const updatedUser = await addPokemonToSix(user.name, pokemon.id);
      if (updatedUser) {
        await update({
          ...data,
          user: { ...data?.user, userSix: updatedUser.userSix },
        });
        context?.setError(false);
      }
    } catch (error) {
      context?.setError(true);
      setTimeout(() => context?.setError(false), 2000);
    }
  };

  return addToSix;
};
