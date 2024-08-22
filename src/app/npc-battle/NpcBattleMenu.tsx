import { useContext } from "react";
import BattleMenuOptions from "./BattleMenuOptions";
import NpcBattleText from "./NpcBattleText";
import { NpcBattleContext } from "./NpcBattleContext";
import BoxAttacks from "../battle/battle-components/BoxAttacks";
import AttacksList from "./AttacksList";
import SwitchBox from "../battle/battle-components/SwitchBox";
import BattleBag from "../battle/battle-components/BattleBag";
import { BattleMenu } from "@/types/enums/enumBattleMenu";
import { NpcBattleState } from "@/types/enums/npcBattleState";

const NpcBattleMenu = () => {
  const context = useContext(NpcBattleContext);

  const returnComponent = () => {
    switch (context?.menuOption) {
      case BattleMenu.FIGHT:
        return <AttacksList />;
      case BattleMenu.SWITCH:
        return <SwitchBox setMenuChoice={context.setMenuOption} />;
      case BattleMenu.BAG:
        return <BattleBag setMenuChoice={context.setMenuOption} />;
      /*case BattleMenu.RUN:
        context.setBattleState(NpcBattleState.BATTLE_STOPPED);
        return;*/
      default:
        return <h2>default</h2>;
    }
  };
  return (
    <div className="user-battle">
      {context?.menuOption === BattleMenu.DEFAULT ||
      context?.menuOption === BattleMenu.RUN ? (
        <NpcBattleText />
      ) : (
        returnComponent()
      )}
      <BattleMenuOptions />
    </div>
  );
};

export default NpcBattleMenu;
