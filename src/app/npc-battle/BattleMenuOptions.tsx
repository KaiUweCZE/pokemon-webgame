import { useContext } from "react";
import { NpcBattleContext } from "./NpcBattleContext";

const BattleMenuOptions = () => {
  const context = useContext(NpcBattleContext);
  return (
    <div className="user-battle-menu">
      <ul>
        <li onClick={() => context?.setMenuOption("fight")}>
          <span>FIGHT</span>
        </li>
        <li onClick={() => context?.setMenuOption("switch")}>
          <span>SWITCH</span>
        </li>
        <li onClick={() => context?.setMenuOption("bag")}>
          <span>BAG</span>
        </li>
        <li onClick={() => context?.setMenuOption("")}>
          <span>RUN</span>
        </li>
      </ul>
    </div>
  );
};

export default BattleMenuOptions;
