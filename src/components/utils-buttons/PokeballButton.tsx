import { BattleContext } from "@/contexts/BattleContext";
import useCatchPokemon from "@/hooks/useCatchPokemon";
import { useContext } from "react";

const PokeballButton = () => {
  const context = useContext(BattleContext);
  const { handleCatch, user } = useCatchPokemon();
  const handleClick = () => {
    if (user && context?.enemyPokemon) {
      handleCatch(user.name, context.enemyPokemon);
    }
  };
  return (
    <button className="button-primary" onClick={handleClick}>
      use
    </button>
  );
};

export default PokeballButton;
