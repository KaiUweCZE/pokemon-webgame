import BattleMenuOptions from "./BattleMenuOptions";
import NpcBattleText from "./NpcBattleText";

const NpcBattleMenu = () => {
  return (
    <div className="user-battle">
      <NpcBattleText />
      <BattleMenuOptions />
    </div>
  );
};

export default NpcBattleMenu;
