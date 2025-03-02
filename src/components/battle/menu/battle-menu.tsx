import BattleMenuButtons from "./battle-menu-buttons";
import BattleMenuActions from "./battle-menu-actions";
import { GradientBackground } from "@/components/ui/primitives/gradient-background";

const BattleMenu = () => {
  return (
    <section className="battle-menu z-10 border-2 border-battle-secondary bg-battle shadow-top">
      <BattleMenuActions />
      <BattleMenuButtons />
      <GradientBackground variant="dark" intensity="low" direction="bottom-left" />
    </section>
  );
};

export default BattleMenu;
