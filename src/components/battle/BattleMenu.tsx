import { useContext } from "react";
import BattleMenuOptions from "../../app/npc-battle/BattleMenuOptions";
import BattleText from "@/components/battle/BattleText";
import { NpcBattleContext } from "../../app/npc-battle/NpcBattleContext";
import BoxAttacks from "@/components/battle/BoxAttacks";
import SwitchBox from "@/components/battle/SwitchBox";
import BattleBag from "@/components/battle/BattleBag";
import { BattleMenuState } from "@/types/enums/enumBattleMenu";
import { useBattleContext } from "@/hooks/useBattleContext";

const BattleMenu = () => {
  const context = useBattleContext();

  const returnComponent = () => {
    switch (context?.menuOption) {
      case BattleMenuState.FIGHT:
        return <BoxAttacks />;
      case BattleMenuState.SWITCH:
        return <SwitchBox setMenuChoice={context.setMenuOption} />;
      case BattleMenuState.BAG:
        return <BattleBag setMenuChoice={context.setMenuOption} />;
      default:
      //return <h2>default</h2>;
    }
  };
  return (
    <div className="user-battle">
      {context?.menuOption === BattleMenuState.DEFAULT ||
      context?.menuOption === BattleMenuState.RUN ? (
        <BattleText />
      ) : (
        returnComponent()
      )}
      <BattleMenuOptions />
    </div>
  );
};

export default BattleMenu;
