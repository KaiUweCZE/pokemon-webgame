import { useContext } from "react";
import { NpcBattleContext } from "./NpcBattleContext";
import { randomOponentPokemon } from "./npc-utils/randomOponentPokemon";
import { BattleMenu } from "@/types/enums/enumBattleMenu";

const NpcBattleText = () => {
  const context = useContext(NpcBattleContext);

  const handleStartBattle = () => {
    if (context?.oponentPokemons?.length) {
      context?.setStartBattle(true);
      context.setMenuOption(BattleMenu.FIGHT);
      const number = randomOponentPokemon(context?.oponentPokemons?.length);
      context.setCurrentOponentPokemon(context.oponentPokemons[number]);
    }
  };

  return (
    <div className="battle-text">
      <p>Are you ready to start the battle?</p>
      <button className="button-primary" onClick={handleStartBattle}>
        click
      </button>
    </div>
  );
};

export default NpcBattleText;
