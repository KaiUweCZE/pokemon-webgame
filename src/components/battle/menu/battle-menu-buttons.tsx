"use client";
import { Button } from "@/components/ui/primitives/button";
import { useBattleStore } from "@/store/battle-store";

const BattleMenuButtons = () => {
  const { setMenuSection, setBattleStatus, battleStatus } = useBattleStore();
  const handleAttackClick = () => {
    setBattleStatus("in-progress");

    setMenuSection("attacks");
  };

  const handleRunClick = () => {
    setMenuSection("run");
    setBattleStatus("paused");
  };

  return (
    <div className="battle-menu-buttons">
      <Button size="full" withRipple onClick={handleAttackClick} className="rounded-none">
        Attack
      </Button>
      <Button size="full" withRipple className="rounded-none">
        Switch
      </Button>
      <Button size="full" withRipple className="rounded-none">
        Bag
      </Button>
      <Button size="full" withRipple onClick={handleRunClick} className="rounded-none">
        Run
      </Button>
    </div>
  );
};

export default BattleMenuButtons;
