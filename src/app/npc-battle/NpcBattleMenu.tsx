import { useContext } from "react";
import BattleMenuOptions from "./BattleMenuOptions";
import NpcBattleText from "./NpcBattleText";
import { NpcBattleContext } from "./NpcBattleContext";
import BoxAttacks from "../battle/battle-components/BoxAttacks";
import AttacksList from "./AttacksList";
import SwitchBox from "../battle/battle-components/SwitchBox";

const NpcBattleMenu = () => {
  const context = useContext(NpcBattleContext);

  const returnComponent = () => {
    switch (context?.menuOption) {
      case "fight":
        return <AttacksList />;
      case "switch":
        return <SwitchBox setMenuChoice={context.setMenuOption} />;
      default:
        return <h2>default</h2>;
    }
  };
  return (
    <div className="user-battle">
      {context?.menuOption === "" || !context?.startBattle ? (
        <NpcBattleText />
      ) : (
        returnComponent()
      )}
      <BattleMenuOptions />
    </div>
  );
};

export default NpcBattleMenu;
