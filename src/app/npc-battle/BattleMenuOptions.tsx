import { useContext } from "react";
import { NpcBattleContext } from "./NpcBattleContext";
import { BattleMenu } from "@/types/enums/enumBattleMenu";

const BattleMenuOptions = () => {
  const context = useContext(NpcBattleContext);
  return (
    <div className="user-battle-menu">
      <ul>
        <li onClick={() => context?.setMenuOption(BattleMenu.FIGHT)}>
          <span>FIGHT</span>
        </li>
        <li onClick={() => context?.setMenuOption(BattleMenu.SWITCH)}>
          <span>SWITCH</span>
        </li>
        <li onClick={() => context?.setMenuOption(BattleMenu.BAG)}>
          <span>BAG</span>
        </li>
        <li onClick={() => context?.setMenuOption(BattleMenu.DEFAULT)}>
          <span>RUN</span>
        </li>
      </ul>
    </div>
  );
};

export default BattleMenuOptions;
