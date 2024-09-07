import { BattleContext } from "@/contexts/BattleContext";
import { PokemonContext } from "@/contexts/PokemonContext";
import { Item } from "@/types/item";
import { addReward } from "@/utils/addReward";
import { getReward } from "@/utils/battle-function/getReward";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";

const useReward = () => {
  const { data, update } = useSession();
  const [items, setItems] = useState<Item | null>(null);
  const context = useContext(BattleContext);
  const pokemonContext = useContext(PokemonContext);

  useEffect(() => {
    if (!context?.enemyPokemon) return;

    const reward = getReward(context.enemyPokemon.level);
    setItems(reward);
    pokemonContext?.setReward(reward);
    if (!data) return;

    const handleReward = async () => {
      console.log(" user obtains this reward: ", reward);

      try {
        const updatedUser = await addReward(data.user.name, reward);
        if (updatedUser) {
          await update({
            ...data,
            user: {
              ...data.user,
              items: updatedUser.items,
            },
          });
        }
      } catch (error) {
        console.error("Error handling reward: ", error);
      }
    };

    if (context.enemyPokemon.actualHp === 0) {
      handleReward();
    }
  }, [context?.enemyPokemon?.actualHp]);

  return { items };
};

export default useReward;
