import { BattleContext } from "@/contexts/BattleContext";
import { BattleState } from "@/types/enums/battleState";
import { BattleMenuState } from "@/types/enums/enumBattleMenu";
import { Dispatch, SetStateAction, useContext } from "react";

interface UserBattleMenuProps {
  setMenuChoice: Dispatch<SetStateAction<BattleMenuState>>;
}

const UserBattleMenu = ({ setMenuChoice }: UserBattleMenuProps) => {
  const context = useContext(BattleContext);
  const handleRun = () => {
    setMenuChoice(BattleMenuState.RUN);
    context?.setBattleState(BattleState.BATTLE_STOPPED);
  };
  const handleFight = () => {
    setMenuChoice(BattleMenuState.FIGHT);
    context?.setBattleState(BattleState.BATTLE);
  };
  return (
    <div className="user-battle-menu">
      <ul>
        <li onClick={handleFight}>
          <button>FIGHT</button>
        </li>
        <li onClick={() => setMenuChoice(BattleMenuState.SWITCH)}>
          <button>SWITCH</button>
        </li>
        <li onClick={() => setMenuChoice(BattleMenuState.BAG)}>
          <button>BAG</button>
        </li>
        <li onClick={handleRun}>
          <button>RUN</button>
        </li>
      </ul>
    </div>
  );
};

export default UserBattleMenu;
