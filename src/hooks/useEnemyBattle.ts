import { EnemyContext } from "@/app/battle/EnemyContext";
import { BattleContext } from "@/contexts/BattleContext";
import { generateMoves } from "@/utils/battle-function/generateMoves";
import { randomAttack } from "@/utils/battle-function/randomAttack";
import { useContext, useEffect, useState } from "react";
import { Attack } from "@/types/attack";

const useEnemyBattle = () => {
  const context = useContext(BattleContext);
  const enemyContext = useContext(EnemyContext);
  const [move, setMove] = useState<Attack | null>(null);

  useEffect(() => {
    if (!context || !context.enemyPokemon) return;

    //get moves from generateMoves (array with data from attacksData)
    const moves = generateMoves(
      context?.enemyPokemon?.name,
      context?.enemyPokemon?.level
    );

    console.log("enemy: ", context.enemyPokemon);

    console.log("moves: ", moves);

    const selectedMove = randomAttack(moves);
    setMove(selectedMove);

    console.log("move is: ", selectedMove);

    if (
      context.userPokemon?.actualHp === 0 ||
      context.enemyPokemon.actualHp === 0
    ) {
      context.setStopBattle(true);
    }

    if (move) {
      const interval = setInterval(() => {
        if (
          enemyContext &&
          context.userPokemon &&
          move?.damage &&
          !context.stopBattle
        ) {
          let newHp = (context.userPokemon?.actualHp ?? 0) - move.damage;
          if (newHp <= 0) {
            newHp = 0;
            clearInterval(interval);
          }
          context.setUserPokemon({ ...context.userPokemon, actualHp: newHp });
        }
      }, move?.recoveryTime * 1000);

      return () => clearInterval(interval);
    }
  }, [context, enemyContext]);
};

export default useEnemyBattle;
