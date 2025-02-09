import EnemyBox, { Enemy } from "./enemy-box";
import UserBox, { UserPokemon } from "./user-box";

interface BattleContainerProps {
  enemy: Enemy;
  userPokemon: UserPokemon;
}

const BattleContainer = ({ enemy, userPokemon }: BattleContainerProps) => {
  return (
    <section className="battle-container">
      <EnemyBox enemy={enemy} />
      <UserBox userPokemon={userPokemon} />
    </section>
  );
};

export default BattleContainer;
