import { BattleContext } from "@/contexts/BattleContext";
import { generateMoves } from "@/utils/battle-function/generateMoves";
import { randomAttack } from "@/utils/battle-function/randomAttack";
import { useContext, useEffect, useRef, useState } from "react";
import { changeHpServer } from "@/utils/battle-function/changeHpServer";
import { PokemonContext } from "@/contexts/PokemonContext";
import { BattleState } from "@/types/enums/battleState";
import { restAfterAttack } from "@/utils/battle-function/restAfterAttack";
import { makeDamage } from "@/utils/battle-function/makeDamage";
import { Attack } from "@/types/attack";

const useEnemyBattle = () => {
  const context = useContext(BattleContext);
  const pokemonContext = useContext(PokemonContext);
  const [isAttacking, setIsAttacking] = useState(false);
  const recoveryRef = useRef(500);
  const lastAttackTimeRef = useRef(Date.now());
  const selectedMoveRef = useRef<Attack | null>(null);

  useEffect(() => {
    if (
      !context ||
      !context.enemyPokemon ||
      !pokemonContext ||
      context.battleState !== BattleState.BATTLE
    )
      return;

    const { currentPokemon, setCurrentPokemon } = pokemonContext;
    const { enemyPokemon, setEnemyAttack } = context;

    const performAttack = async () => {
      if (isAttacking) return;

      const now = Date.now();
      if (now - lastAttackTimeRef.current < recoveryRef.current) return;

      if (!selectedMoveRef.current) {
        const moves = generateMoves(enemyPokemon.name, enemyPokemon.level);
        selectedMoveRef.current = randomAttack(moves);
      }
      console.log("Executing attack: ", selectedMoveRef.current.name);

      setIsAttacking(true);
      setEnemyAttack(selectedMoveRef.current);
      lastAttackTimeRef.current = now;

      console.log("enemy attack: ", context.enemyAttack);

      if (context.enemyAttack && currentPokemon) {
        const newHp = makeDamage(
          context.enemyAttack.damage,
          currentPokemon.actualHp,
          currentPokemon.type,
          context.enemyAttack.type,
          enemyPokemon.damage,
          currentPokemon.defense
        );

        setCurrentPokemon((prevPokemon) => {
          if (!prevPokemon) return prevPokemon;
          return { ...prevPokemon, actualHp: newHp };
        });

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
          const newRecoveryTime = restAfterAttack(
            enemyPokemon.speed,
            selectedMoveRef.current.recoveryTime
          );
          recoveryRef.current = newRecoveryTime * 1000;
          console.log(
            `New recovery time: ${newRecoveryTime}s, recovery ref: ${recoveryRef.current}`
          );
          selectedMoveRef.current = null;
        }

        if (newHp === 0) {
          context.setBattleState(BattleState.USER_POKEMON_FAINTED);
        }
      } else {
        // tunr on again if context is not set yet
        setIsAttacking(false);
      }
    };

    const intervalId = setInterval(performAttack, 50);

    return () => clearInterval(intervalId);
  }, [context, pokemonContext]);
};

export default useEnemyBattle;
