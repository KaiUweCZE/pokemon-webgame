"use client";
import { Button } from "@/components/ui/primitives/button";
import { useBattleStore } from "@/store/battle/battle-store";
import BattleBag from "./battle-bag";
import BattleSwitch from "./battle-switch";
import { setBattleStatus, setMenuSection } from "@/store/battle/actions/battle-state";
import NewLevelInfo from "./new-level-info";

const BattleMenuButtons = () => {
  const { activeMenuSection } = useBattleStore();
  const handleAttackClick = () => {
    setBattleStatus("in-progress");
    setMenuSection("attacks");
  };

  const handleRunClick = () => {
    setMenuSection("run");
    setBattleStatus("paused");
  };

  const handleBagClick = () => {
    if (activeMenuSection === "bag") {
      setMenuSection("main");
      return;
    }
    setMenuSection("bag");
  };

  const handleSwitchClick = () => {
    if (activeMenuSection === "switch") {
      setMenuSection("main");
      return;
    }
    setMenuSection("switch");
  };

  return (
    <div className="battle-menu-buttons relative">
      <Button
        size="full"
        variant="light"
        withRipple
        onClick={handleAttackClick}
        className="rounded-none shadow-inset"
      >
        Attack
      </Button>
      <Button
        size="full"
        variant="light"
        withRipple
        onClick={handleSwitchClick}
        className="rounded-none shadow-inset"
      >
        Switch
      </Button>
      <Button
        size="full"
        variant="light"
        withRipple
        onClick={handleBagClick}
        className="rounded-none shadow-inset"
      >
        Bag
      </Button>
      <Button
        size="full"
        variant="light"
        withRipple
        onClick={handleRunClick}
        className="rounded-none shadow-inset"
      >
        Run
      </Button>
      <BattleBag isOpen={activeMenuSection === "bag"} setIsOpen={handleBagClick} />
      <BattleSwitch isOpen={activeMenuSection === "switch"} setIsOpen={handleSwitchClick} />
      <NewLevelInfo />
    </div>
  );
};

export default BattleMenuButtons;
