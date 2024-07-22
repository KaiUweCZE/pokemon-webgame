import { BattleContext } from "@/contexts/BattleContext";
import { PokemonBattle } from "@/types/pokemonBattle";
import { catchPokemon } from "@/utils/battle-function/catchPokemon";
import { useSession } from "next-auth/react";
import { useContext } from "react";

const useCatchPokemon = () => {
  const { data, update, status } = useSession();
  const context = useContext(BattleContext);

  const user = data?.user;

  const randomCatch = () => {
    let number = Math.ceil(Math.random() * 3);
    console.log("numberrrr is : ", number);

    return number > 1;
  };

  const handleCatch = async (username: string, pokemon: PokemonBattle) => {
    const result = randomCatch();
    let pokeball = data?.user.items.find((item) => item.name === "pokeball");
    if (!pokeball || pokeball?.count < 1) {
      console.log("you dont have pokeball");
      return null;
    }

    context?.setIsCatching({ underway: true, isSucces: false });
    if (!result) {
      setTimeout(() => {
        context?.setIsCatching({ underway: false, isSucces: false });
      }, 5000);
      return null;
    }

    try {
      const updatedUser = await catchPokemon(username, pokemon);
      if (!updatedUser) return null;
      await update({
        ...data,
        user: {
          ...data?.user,
          items: updatedUser.items,
          pokemonId: updatedUser.pokemonIds,
        },
      });
      setTimeout(() => {
        context?.setIsCatching({ underway: false, isSucces: true });
      }, 5000);
    } catch (error) {
      console.error("error occurs: ", error);
    }
  };
  return { handleCatch, user };
};
export default useCatchPokemon;
