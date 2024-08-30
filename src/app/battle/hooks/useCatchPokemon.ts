import { BattleContext } from "@/contexts/BattleContext";
import { PokemonBattle } from "@/types/pokemonBattle";
import { catchPokemon } from "../utils/catchPokemon";
import { useSession } from "next-auth/react";
import { useCallback, useContext } from "react";
import { BattleState } from "@/types/enums/battleState";

const useCatchPokemon = () => {
  const { data, update, status } = useSession();
  const context = useContext(BattleContext);

  const user = data?.user;

  const randomCatch = useCallback(() => {
    return Math.random() < 2 / 3;
  }, []);

  const handleCatch = async (username: string, pokemon: PokemonBattle) => {
    if (!context) {
      console.error("Battle context is missing");
      return;
    }

    const pokeball = data?.user.items.find((item) => item.name === "pokeball");
    if (!pokeball || pokeball.count < 1) {
      console.log("You don't have any pokeballs");
      return;
    }

    //context?.setIsCatching({ underway: true, isSucces: false });
    context.setBattleState(BattleState.CATCHING);
    context?.setStopBattle(true);

    const result = randomCatch();
    console.log("result of catching: ", result);

    try {
      console.log("start with server side");

      const updatedUser = await catchPokemon(username, pokemon, result);
      if (!updatedUser) {
        throw new Error("Failed to update user after catching Pokemon");
      }
      await update({
        ...data,
        user: {
          ...data?.user,
          items: updatedUser.items,
          pokemonId: updatedUser.pokemonIds,
        },
      });

      if (result) {
        setTimeout(() => {
          context.setBattleState(BattleState.CAUGHT);
        }, 3500);
      } else {
        setTimeout(() => {
          context?.setStopBattle(false);
          context.setBattleState(BattleState.BATTLE);
        }, 3500);
      }
    } catch (error) {
      console.error("Error occurred while catching Pokemon: ", error);
      context.setBattleState(BattleState.BATTLE);
    }
  };
  return { handleCatch, user };
};
export default useCatchPokemon;
