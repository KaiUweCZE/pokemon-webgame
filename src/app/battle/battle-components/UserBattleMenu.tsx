import { BattleMenu } from "@/types/enums/enumBattleMenu";
import { Dispatch, SetStateAction } from "react";

interface UserBattleMenuProps {
  setMenuChoice: Dispatch<SetStateAction<BattleMenu>>;
}

const UserBattleMenu = ({ setMenuChoice }: UserBattleMenuProps) => {
  return (
    <div className="user-battle-menu">
      <ul>
        <li onClick={() => setMenuChoice(BattleMenu.FIGHT)}>
          <button>FIGHT</button>
        </li>
        <li onClick={() => setMenuChoice(BattleMenu.SWITCH)}>
          <button>SWITCH</button>
        </li>
        <li onClick={() => setMenuChoice(BattleMenu.BAG)}>
          <button>BAG</button>
        </li>
        <li onClick={() => setMenuChoice(BattleMenu.DEFAULT)}>
          <button>RUN</button>
        </li>
      </ul>
    </div>
  );
};

export default UserBattleMenu;
