import { BattleContext } from "@/contexts/BattleContext";
import useCatchPokemon from "@/app/battle/hooks/useCatchPokemon";
import { useCallback, useContext } from "react";

const PokeballButton = () => {
  const context = useContext(BattleContext);
  const { handleCatch, user } = useCatchPokemon();
  const handleClick = useCallback(() => {
    if (user && context?.enemyPokemon) {
      handleCatch(user.name, context.enemyPokemon);
    }
  }, [handleCatch]);
  return (
    <button
      className="button-primary"
      onClick={handleClick}
      disabled={context?.stopBattle}
    >
      use
    </button>
  );
};

export default PokeballButton;
