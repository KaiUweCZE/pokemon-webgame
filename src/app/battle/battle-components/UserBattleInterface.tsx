import BattleBag from "@/components/battle/BattleBag";
import BoxAttacks from "@/components/battle/BoxAttacks";
import SwitchBox from "@/components/battle/SwitchBox";
import { BattleState } from "@/types/enums/battleState";
import { BattleMenuState } from "@/types/enums/enumBattleMenu";
import NewLevel from "./NewLevel";
import { Pokemon } from "@/types/pokemon";
import BattleText from "./BattleText";
import UserBattleMenu from "@/app/battle/battle-components/UserBattleMenu";
import useDamage from "../hooks/useDamage";

interface UserBattleInterfaceProps {
  menuOption: BattleMenuState;
  setMenuOption: React.Dispatch<React.SetStateAction<BattleMenuState>>;
  battleState: BattleState;
  currentPokemon: Pokemon;
  newLevel: boolean;
}

const UserBattleInterface = ({
  menuOption,
  setMenuOption,
  battleState,
  currentPokemon,
  newLevel,
}: UserBattleInterfaceProps) => {
  // check conditions and return valid message

  useDamage();
  const getBattleText = () => {
    if (!battleState) return;
    if (battleState === BattleState.CAUGHT) {
      return <BattleText battleState={battleState} />;
    }
    if (menuOption === BattleMenuState.FIGHT) {
      return null;
    }
    return <BattleText battleState={battleState} />;
  };

  return (
    <div className="user-battle">
      {getBattleText()}
      {menuOption === BattleMenuState.FIGHT &&
        battleState !== BattleState.CATCHING && <BoxAttacks />}
      {menuOption === BattleMenuState.SWITCH && (
        <SwitchBox setMenuChoice={setMenuOption} />
      )}
      {menuOption === BattleMenuState.BAG && (
        <BattleBag setMenuChoice={setMenuOption} />
      )}
      <UserBattleMenu setMenuChoice={setMenuOption} />
      {newLevel && <NewLevel pokemon={currentPokemon} />}
    </div>
  );
};

export default UserBattleInterface;
