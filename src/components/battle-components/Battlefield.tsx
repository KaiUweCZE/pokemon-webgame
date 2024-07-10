"use client";
import EnemyPokemon from "./EnemyPokemon";
import UserPokemonBattle from "./UserPokemonBattle";
import "@/assets/styles/battle-style.css";
import BoxAttacks from "./BoxAttacks";
import UserBattleMenu from "./UserBattleMenu";
import SwitchBox from "./SwitchBox";
import BattleBag from "./BattleBag";
import useBattle from "@/hooks/useBattle";
import useNewLevel from "@/hooks/useNewLevel";
import NewLevel from "./NewLevel";
import BattleText from "./BattleText";

const Battlefield = () => {
  const {
    damage,
    setDamage,
    change,
    setChange,
    menuChoice,
    setMenuChoice,
    animationTime,
    enemyPokemon,
    userPokemon,
  } = useBattle();

  const newLevel = useNewLevel(change);

  return (
    <section className="container-battlefield">
      {userPokemon && (
        <UserPokemonBattle
          userPokemon={userPokemon}
          setDamage={setDamage}
          setChange={setChange}
        />
      )}
      {enemyPokemon && <EnemyPokemon enemyPokemon={enemyPokemon} />}
      {animationTime && <span className="hp-animation">-{damage}</span>}
      {userPokemon && (
        <div className="user-battle">
          {enemyPokemon && menuChoice === "" && (
            <BattleText pokemonName={enemyPokemon.name} />
          )}
          {menuChoice === "fight" && (
            <BoxAttacks
              userPokemon={userPokemon}
              setDamage={setDamage}
              setChange={setChange}
            />
          )}
          {menuChoice === "switch" && (
            <SwitchBox setMenuChoice={setMenuChoice} />
          )}
          {menuChoice === "bag" && <BattleBag setMenuChoice={setMenuChoice} />}
          <UserBattleMenu setMenuChoice={setMenuChoice} />
          {newLevel && <NewLevel />}
        </div>
      )}
    </section>
  );
};

export default Battlefield;
