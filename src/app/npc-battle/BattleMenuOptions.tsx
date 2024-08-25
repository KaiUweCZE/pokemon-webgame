import { useContext, useEffect, useState } from "react";
import { NpcBattleContext } from "./NpcBattleContext";
import { BattleMenuState } from "@/types/enums/enumBattleMenu";
import { BattleState } from "@/types/enums/battleState";

const BattleMenuOptions = () => {
  const context = useContext(NpcBattleContext);
  const [prevState, setPrevState] = useState<BattleState>(
    BattleState.NOT_STARTED
  );

  useEffect(() => {
    if (context?.battleState !== BattleState.BATTLE_STOPPED) {
      setPrevState(context?.battleState || BattleState.NOT_STARTED);
    }
  }, [context?.battleState]);

  const menuOptions = [
    { label: "FIGHT", option: BattleMenuState.FIGHT },
    { label: "SWITCH", option: BattleMenuState.SWITCH },
    { label: "BAG", option: BattleMenuState.BAG },
  ];

  // In case that user click on run and want to return to battle
  const handleMenuOption = (menuOption: BattleMenuState) => {
    if (context?.battleState === BattleState.BATTLE_STOPPED) {
      context.setBattleState(prevState);
    }
    context?.setMenuOption(menuOption);
  };

  const handleRun = () => {
    context?.setMenuOption(BattleMenuState.RUN);
    context?.setBattleState(BattleState.BATTLE_STOPPED);
  };
  return (
    <div className="user-battle-menu">
      <ul>
        {menuOptions.map(({ label, option }) => (
          <li key={label} onClick={() => handleMenuOption(option)}>
            <span>{label}</span>
          </li>
        ))}
        <li onClick={handleRun}>
          <span>RUN</span>
        </li>
      </ul>
    </div>
  );
};

export default BattleMenuOptions;
