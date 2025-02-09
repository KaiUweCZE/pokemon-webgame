import BattleMenuButtons from "./battle-menu-buttons";
import BattleMenuActions from "./battle-menu-actions";

const BattleMenu = () => {
  return (
    <section className="battle-menu shadow-top z-10 bg-primary-dark">
      <BattleMenuActions />
      <BattleMenuButtons />
    </section>
  );
};

export default BattleMenu;
