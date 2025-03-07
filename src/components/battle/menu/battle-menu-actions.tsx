"use client";
import { useBattleStore } from "@/store/battle/battle-store";
import NotStartedWindow from "./action-windows/not-started-window";
import AttackWindow from "./action-windows/attack-window";
import RunWindow from "./action-windows/run-window";
import UserPokemonWinWindow from "./action-windows/user-pokemon-win-window";
import CaughtPokemonWindow from "./action-windows/caught-pokemon-window";

const BattleMenuActions = () => {
  const { battleStatus, activeMenuSection } = useBattleStore();

  // Helper function to determine which component to render
  const renderActionContent = () => {
    switch (battleStatus) {
      case "not-started":
        return <NotStartedWindow />;
      case "in-progress":
        if (activeMenuSection === "attacks") return <AttackWindow />;
        break;
      case "user-victory":
      case "pokemon-caught":
        return <UserPokemonWinWindow />;
      case "paused":
        if (activeMenuSection === "run") return <RunWindow />;
        break;
      default:
        return null;
    }
    return null;
  };

  return <div className="grid max-h-full gap-4 px-2">{renderActionContent()}</div>;
};

export default BattleMenuActions;
