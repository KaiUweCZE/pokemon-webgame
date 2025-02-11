import { useBattleStore } from "@/store/battle/battle-store";
import EnemyBox from "./enemy-box";
import UserBox from "./user-box";
import { type BattlePokemon, type EnemyPokemon } from "@/types/pokemon";

interface BattleContainerProps {
  enemyPokemon: EnemyPokemon;
  userPokemon: BattlePokemon;
}

const BattleContainer = ({ enemyPokemon, userPokemon }: BattleContainerProps) => {
  return (
    <section className="battle-container">
      <EnemyBox enemyPokemon={enemyPokemon} />
      <UserBox userPokemon={userPokemon} />
    </section>
  );
};

export default BattleContainer;
