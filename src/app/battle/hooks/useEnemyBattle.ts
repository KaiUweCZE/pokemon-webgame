import { BattleContext } from "@/contexts/BattleContext";
import { generateMoves } from "@/utils/battle-function/generateMoves";
import { randomAttack } from "@/utils/battle-function/randomAttack";
import { useContext, useEffect, useState } from "react";
import { changeHpServer } from "@/utils/battle-function/changeHpServer";
import { PokemonContext } from "@/contexts/PokemonContext";
import { BattleState } from "@/types/enums/battleState";
import { restAfterAttack } from "@/utils/battle-function/restAfterAttack";

const useEnemyBattle = () => {
  const context = useContext(BattleContext);
  const pokemonContext = useContext(PokemonContext);
  const [isAttacking, setIsAttacking] = useState(false);

  useEffect(() => {
    if (!context || !context.enemyPokemon || !pokemonContext) return;
    const move = context.enemyAttack;
    const { currentPokemon, setCurrentPokemon } = pokemonContext;
    const setMove = context.setEnemyAttack;
    //get moves from generateMoves (array with data from attacksData)
    const moves = generateMoves(
      context?.enemyPokemon?.name,
      context?.enemyPokemon?.level
    );

    // set random attack from the enemy attacks
    const selectedMove = randomAttack(moves);
    setMove(selectedMove);
    const recovery = restAfterAttack(
      context.enemyPokemon.speed,
      selectedMove.recoveryTime
    );

    if (move && currentPokemon && context.battleState === BattleState.BATTLE) {
      // check if there is not attack in progress
      if (isAttacking) return;
      const interval = setInterval(async () => {
        console.log(
          `start recovery: ${recovery} attack: ${selectedMove.name} recovery time: ${selectedMove.recoveryTime}`
        );
        setIsAttacking(true);

        let newHp = Math.max(currentPokemon?.actualHp - move.damage, 0);
        setCurrentPokemon((prevPokemon) => {
          if (!prevPokemon) return prevPokemon;
          return { ...prevPokemon, actualHp: newHp };
        });

        // active and deactive animation
        context.setEnemyAttackAnimation(true);
        setTimeout(() => {
          context.setEnemyAttackAnimation(false);
        }, 1500);
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
  }, [context, pokemonContext?.currentPokemon?.actualEnergy]);
};

export default useEnemyBattle;
