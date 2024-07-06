"use client";
import EnemyPokemon from "./EnemyPokemon";
import { PokemonBattle } from "@/types/pokemonBattle";
import UserPokemonBattle from "./UserPokemonBattle";
import { useContext, useEffect, useState } from "react";
import { BattleContext } from "@/contexts/BattleContext";
import "@/assets/styles/battle-style.css";
import { makeDamage } from "@/utils/battle-function/makeDamage";
import BoxAttacks from "./BoxAttacks";
import UserBattleMenu from "./UserBattleMenu";
import SwitchBox from "./SwitchBox";
import BattleBag from "./BattleBag";

const Battlefield = () => {
  const [damage, setDamage] = useState(0);
  const [change, setChange] = useState(0);
  const [menuChoice, setMenuChoice] = useState("");
  const [animationTime, setAnimationTime] = useState(false);
  const context = useContext(BattleContext);
  if (!context) {
    throw new Error("missing context");
  }
  const enemyPokemon = context.enemyPokemon;
  const setEnemyPokemon = context.setEnemyPokemon;
  const userPokemon = context.userPokemon;

  useEffect(() => {
    if (enemyPokemon) {
      const newHp = enemyPokemon && makeDamage(damage, enemyPokemon?.actualHp);
      setEnemyPokemon({
        ...enemyPokemon,
        actualHp: newHp <= 0 ? 0 : newHp,
      });
    }
    if (damage > 0) {
      setAnimationTime(true);
      const timeout = setTimeout(() => {
        setAnimationTime(false);
      }, 1000);

      // Cleanup timeout
      return () => clearTimeout(timeout);
    }
  }, [change]);
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
            <div className="battle-text">
              <p>{`oh man, that looks like a ${enemyPokemon.name}!`}</p>
            </div>
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
        </div>
      )}
    </section>
  );
};

export default Battlefield;
