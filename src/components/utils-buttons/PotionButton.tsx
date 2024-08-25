import { BattleContext } from "@/contexts/BattleContext";
import { PokemonContext } from "@/contexts/PokemonContext";
import { healPokemon } from "@/utils/healPokemon";
import { useSession } from "next-auth/react";
import { useContext } from "react";

enum PotionType {
  Potion = "potion",
  SuperPotion = "super-potion",
  HyperPotion = "hyper-potion",
}

interface PotionButtonProps {
  potionType: string;
}

const PotionButton = ({ potionType }: PotionButtonProps) => {
  const context = useContext(PokemonContext);
  const battleContext = useContext(BattleContext);
  const { data, update } = useSession();
  const isFullyHealed =
    context?.currentPokemon?.actualHp === context?.currentPokemon?.hp;

  const handleClick = async () => {
    if (!context?.currentPokemon || !data) return;

    const pokemon = context.currentPokemon;
    const setPokemon = context.setCurrentPokemon;
    let healAmount;

    switch (potionType) {
      case "potion":
        healAmount = 10;
        break;
      case "super-potion":
        healAmount = 50;
        break;
      case "hyper-potion":
        healAmount = 100;
        break;
      default:
        healAmount = 10;
    }
    try {
      const result = await healPokemon(pokemon.id, healAmount, potionType);
      if (result) {
        const { updatedPokemon, updatedUser } = result;
        setPokemon({ ...pokemon, actualHp: updatedPokemon.actualHp });
        await update({
          ...data,
          user: {
            ...data.user,
            items: updatedUser.items,
          },
        });
        console.log("Pokemon is updated: ", updatedPokemon);
        console.log("User items are updated: ", updatedUser.items);
      } else {
        console.log(
          `Failed to use ${potionType}. Maybe you're out of potions?`
        );
      }
    } catch (error) {
      console.error("Failed to heal pokemon:", error);
    }
  };
  return (
    <button
      className="button-primary"
      onClick={handleClick}
      disabled={isFullyHealed || battleContext?.stopBattle}
    >
      use
    </button>
  );
};

export default PotionButton;
