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
    // Battle not started yet
    if (battleStatus === "not-started") {
      return <NotStartedWindow />;
    }

    if (battleStatus === "in-progress" && activeMenuSection === "attacks") {
      return <AttackWindow />;
    }

    if (battleStatus === "user-victory") {
      return <UserPokemonWinWindow />;
    }

    if (battleStatus === "pokemon-caught") {
      return <CaughtPokemonWindow />;
    }

    // If user wants to leave a battle
    if (battleStatus === "paused" && activeMenuSection === "run") {
      return <RunWindow />;
    }

    return null;
  };

  return <div className="grid max-h-full gap-4 px-2">{renderActionContent()}</div>;
};

export default BattleMenuActions;
