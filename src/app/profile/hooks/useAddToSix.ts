import { useSession } from "next-auth/react";
import { useContext } from "react";
import { ProfileContext } from "../ProfileContext";
import { addPokemonToSix } from "../action";

export const useAddToSix = () => {
  const { data, update } = useSession();
  const context = useContext(ProfileContext);

  const addToSix = async (pokemonId: string) => {
    const user = data?.user;
    if (!user) return;

    try {
      const updatedUser = await addPokemonToSix(user.name, pokemonId);
      if (updatedUser) {
        await update({
          ...data,
          user: { ...data?.user, userSix: updatedUser.userSix },
        });
        context?.setError(false);
      }
    } catch (error) {
      context?.setMessage("This pokemon is already in your Six");
      context?.setError(true);
      setTimeout(() => context?.setError(false), 2000);
    }
  };

  return addToSix;
};
