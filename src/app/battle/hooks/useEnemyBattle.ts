import { BattleContext } from "@/contexts/BattleContext";
import { generateMoves } from "@/utils/battle-function/generateMoves";
import { randomAttack } from "@/utils/battle-function/randomAttack";
import { useContext, useEffect, useState } from "react";
import { changeHpServer } from "@/utils/battle-function/changeHpServer";
import { PokemonContext } from "@/contexts/PokemonContext";
import { BattleState } from "@/types/enums/battleState";
import { restAfterAttack } from "@/utils/battle-function/restAfterAttack";
import { makeDamage } from "@/utils/battle-function/makeDamage";

const useEnemyBattle = () => {
  const context = useContext(BattleContext);
  const pokemonContext = useContext(PokemonContext);
  const [isAttacking, setIsAttacking] = useState(false);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    if (!context || !context.enemyPokemon || !pokemonContext) return;
    console.log("is attacking?: ", isAttacking);

    if (isAttacking) return;
    const move = context.enemyAttack;
    const { currentPokemon, setCurrentPokemon } = pokemonContext;
    const { enemyPokemon } = context;
    const setMove = context.setEnemyAttack;
    //get moves from generateMoves (array with data from attacksData)
    const moves = generateMoves(enemyPokemon.name, enemyPokemon.level);

    // set random attack from the enemy attacks
    const selectedMove = randomAttack(moves);
    setMove(selectedMove);
    const recovery = restAfterAttack(
      enemyPokemon.speed,
      selectedMove.recoveryTime
    );

    console.log("trigger!! ", trigger);

    if (move && currentPokemon && context.battleState === BattleState.BATTLE) {
      // check if there is not attack in progress

      const interval = setInterval(async () => {
        console.log(
          `start recovery: ${recovery} attack: ${selectedMove.name} recovery time: ${selectedMove.recoveryTime}`
        );
        setIsAttacking(true);

        const newHp = makeDamage(
          move.damage,
          currentPokemon.actualHp,
          currentPokemon.type,
          move.type,
          enemyPokemon.damage,
          currentPokemon.defense
        );

        console.log("new hP: ", newHp);

        setCurrentPokemon((prevPokemon) => {
          if (!prevPokemon) return prevPokemon;
          return { ...prevPokemon, actualHp: newHp };
        });

        // active and deactive animation
        context.setEnemyAttackAnimation(true);
        setTimeout(() => {
          context.setEnemyAttackAnimation(false);
        }, 1000);
        try {
          await changeHpServer(currentPokemon.id, newHp);
        } catch (error) {
          console.error("error occurs: ", error);
        } finally {
          setIsAttacking(false);
        }
        if (newHp === 0) {
          clearInterval(interval);
          context.setBattleState(BattleState.USER_POKEMON_FAINTED);
        }
      }, recovery * 1000);

      return () => clearInterval(interval);
    }
  }, [context, pokemonContext, trigger]);

  useEffect(() => {
    if (!isAttacking) {
      setTrigger((prev) => prev + 1);
      console.log("triggered: ", trigger);
    }
  }, [isAttacking]);
};

export default useEnemyBattle;
