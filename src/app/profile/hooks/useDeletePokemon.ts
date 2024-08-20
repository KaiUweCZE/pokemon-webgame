import { useSession } from "next-auth/react";
import { ProfileContext } from "../ProfileContext";
import { useContext } from "react";
import { removePokemon } from "../action";

export const useDeletePokemon = () => {
  const { data, update } = useSession();
  const context = useContext(ProfileContext);

  const deletePokemon = async (pokemonId: string) => {
    const user = data?.user;
    if (!user) return;

    try {
      if (!data?.user.userSix.includes(pokemonId)) {
        const updatedUser = await removePokemon(pokemonId, user?.name);
        if (updatedUser) {
          await update({
            ...data,
            user: { ...data?.user, PokemonIds: updatedUser.pokemonIds },
          });
        }
      } else {
        context?.setMessage("You cannot delete pokemon from your six");
        context?.setError(true);
        setTimeout(() => context?.setError(false), 2000);
      }
    } catch (err) {
      console.error("error occurs while deleting", err);
    }
  };

  return deletePokemon;
};
