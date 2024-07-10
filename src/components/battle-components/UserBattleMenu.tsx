import { Dispatch, SetStateAction } from "react";

interface UserBattleMenuProps {
  setMenuChoice: Dispatch<SetStateAction<string>>;
}

const UserBattleMenu = ({ setMenuChoice }: UserBattleMenuProps) => {
  return (
    <div className="user-battle-menu">
      <ul>
        <li onClick={() => setMenuChoice("fight")}>
          <span>FIGHT</span>
        </li>
        <li onClick={() => setMenuChoice("switch")}>
          <span>SWITCH</span>
        </li>
        <li onClick={() => setMenuChoice("bag")}>
          <span>BAG</span>
        </li>
        <li onClick={() => setMenuChoice("")}>
          <span>RUN</span>
        </li>
      </ul>
    </div>
  );
};

export default UserBattleMenu;
