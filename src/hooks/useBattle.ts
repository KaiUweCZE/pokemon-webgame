import { useState, useEffect, useContext } from "react";
import { BattleContext } from "@/contexts/BattleContext";
import { makeDamage } from "@/utils/battle-function/makeDamage";
import { getExp } from "@/utils/battle-function/getExp";
import { addExp } from "@/utils/addExp";
import { PokemonBattle } from "@/types/pokemonBattle";
import { Item } from "@/types/item";
import { getReward } from "@/utils/battle-function/getReward";
import { addReward } from "@/utils/addReward";
import { error } from "console";

/**
 * Custom hook to manage the battle state and logic.
 * This hook provides functionalities to handle damage calculation,
 * experience gain, level up, and UI state management during a battle.
 *
 * @returns {object} The state and functions for managing the battle.
 */

const useBattle = () => {
  // state to manage the amount of damage
  const [damage, setDamage] = useState(0);
  // state to track changes in the battle
  const [change, setChange] = useState(0);
  // state to track the user's menu choice
  const [menuChoice, setMenuChoice] = useState("");
  // display user's dame for a while
  const [animationTime, setAnimationTime] = useState(false);
  const [newLevel, setNewLevel] = useState(true);
  const [exp, setExp] = useState(0);
  const [reward, setReward] = useState<Item | null>(null);
  const context = useContext(BattleContext);
  if (!context) {
    throw new Error("missing context");
  }

  const {
    enemyPokemon,
    setEnemyPokemon,
    userPokemon,
    setUserPokemon,
    isCatching,
    setStopBattle,
    stopBattle,
  } = context;

  // check user's pokemon hp
  useEffect(() => {
    if (userPokemon?.actualHp === 0) {
      setStopBattle(true);
      console.log("stop the fight");
    } else {
      setStopBattle(false);
      console.log("lets fighhht", stopBattle);
    }
  }, [context]);

  useEffect(() => {
    // Calculate new HP after the damage
    if (userPokemon && context.attack && enemyPokemon && !stopBattle) {
      const newHp = makeDamage(
        damage,
        enemyPokemon?.actualHp,
        enemyPokemon?.type,
        context?.attack.type,
        userPokemon?.damage,
        enemyPokemon?.defense
      );
      setEnemyPokemon({
        ...enemyPokemon,
        actualHp: newHp <= 0 ? 0 : newHp,
      });
    }

    // Trigger damage animation and reset it
    if (damage > 0 && !stopBattle) {
      setAnimationTime(true);
      const timeout = setTimeout(() => {
        setAnimationTime(false);
      }, 1000);
      // Cleanup timeout
      return () => clearTimeout(timeout);
    }
  }, [change]);

  useEffect(() => {
    // If the enemy Pokemon's HP reaches 0, calculate and add exps
    if (enemyPokemon?.actualHp === 0 && damage > 0) {
      const newExp = getExp({
        pokemonHp: 0,
        pokemonName: enemyPokemon.name,
        pokemonLevel: enemyPokemon.level,
      });
      setExp(newExp);

      setMenuChoice("");

      if (newExp && userPokemon) {
        addExp({ pokemonId: userPokemon.id, newExps: newExp }).then(
          (updatedPokemon) => {
            if (updatedPokemon) {
              setUserPokemon({
                ...userPokemon,
                actualExp: updatedPokemon.actualExp,
                level: updatedPokemon.level,
                expToLevel: updatedPokemon.expToLevel,
                damage: updatedPokemon.damage,
                defense: updatedPokemon.defense,
                energy: updatedPokemon.energy,
                hp: updatedPokemon.hp,
                speed: updatedPokemon.speed,
              });
              // Set new level notification
              if (updatedPokemon.level > userPokemon.level) {
                setNewLevel(true);
                const timeout = setTimeout(() => {
                  setNewLevel(false);
                }, 5000);
                // Cleanup timeout
                return () => clearTimeout(timeout);
              }
            }
          }
        );
      }
    }
  }, [enemyPokemon?.actualHp]);

  return {
    damage,
    setDamage,
    change,
    setChange,
    menuChoice,
    setMenuChoice,
    animationTime,
    enemyPokemon,
    userPokemon,
    exp,
    isCatching,
  };
};

export default useBattle;
