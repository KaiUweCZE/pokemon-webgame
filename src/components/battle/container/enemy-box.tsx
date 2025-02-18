import Image from "next/image";
import BattlePokemonStats from "../battle-pokemon-stats";
import { type EnemyPokemon } from "@/types/pokemon";
import battlefieldImg from "@/images/fields/field2.webp";
import AttackAnimation from "../attack-animation";
import { useBattleStore } from "@/store/battle/battle-store";
import { setUserAttackAnimation } from "@/store/battle/actions/battle-animations";
import { cn } from "@/utils/cn";
import Pokeball from "../pokeball";
import { useEnemyAttack } from "@/hooks/battle/use-enemy-attack";

const EnemyBox = ({ enemyPokemon }: { enemyPokemon: EnemyPokemon }) => {
  const { animations, battleStatus } = useBattleStore();
  const userAttackAnimation = animations.user;
  const pokeballViewed = battleStatus === "catching" || battleStatus === "pokemon-caught";

  useEnemyAttack();
  return (
    <div className="enemy-box">
      <div className={cn("enemy-stats-box", enemyPokemon.currentHp === 0 && "enemy-done")}>
        <BattlePokemonStats
          pokemonName={enemyPokemon.name}
          pokemonLevel={enemyPokemon.level}
          maxHp={enemyPokemon.maxHp}
          currentHp={enemyPokemon.currentHp}
        />
      </div>
      <div className="enemy-image-box">
        {!pokeballViewed && (
          <Image
            className={cn("enemy-image", enemyPokemon.currentHp === 0 && "enemy-done")}
            src={enemyPokemon.image?.default.src}
            alt={enemyPokemon.image?.default.alt}
            width={120}
            height={120}
          />
        )}
        <Image
          className="enemy-field"
          src={battlefieldImg}
          alt="ground under pokemon"
          width={200}
          height={200}
        />
        {userAttackAnimation && (
          <AttackAnimation image={userAttackAnimation.img} setAnimation={setUserAttackAnimation} />
        )}
        {pokeballViewed && <Pokeball animation={cn(pokeballViewed && "catching")} />}
      </div>
    </div>
  );
};

export default EnemyBox;
