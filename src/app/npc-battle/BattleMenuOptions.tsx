import { useContext, useEffect, useState } from "react";
import { NpcBattleContext } from "./NpcBattleContext";
import { BattleMenu } from "@/types/enums/enumBattleMenu";
import { NpcBattleState } from "@/types/enums/npcBattleState";

const BattleMenuOptions = () => {
  const context = useContext(NpcBattleContext);
  const [prevState, setPrevState] = useState<NpcBattleState>(
    NpcBattleState.NOT_STARTED
  );

  useEffect(() => {
    if (context?.battleState !== NpcBattleState.BATTLE_STOPPED) {
      setPrevState(context?.battleState || NpcBattleState.NOT_STARTED);
    }
  }, [context?.battleState]);

  const menuOptions = [
    { label: "FIGHT", option: BattleMenu.FIGHT },
    { label: "SWITCH", option: BattleMenu.SWITCH },
    { label: "BAG", option: BattleMenu.BAG },
  ];

  // In case that user click on run and want to return to battle
  const handleMenuOption = (menuOption: BattleMenu) => {
    if (context?.battleState === NpcBattleState.BATTLE_STOPPED) {
      context.setBattleState(prevState);
    }
    context?.setMenuOption(menuOption);
  };

  const handleRun = () => {
    context?.setMenuOption(BattleMenu.RUN);
    context?.setBattleState(NpcBattleState.BATTLE_STOPPED);
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
