import { BattleContext } from "@/contexts/BattleContext";
import { generateMoves } from "@/utils/battle-function/generateMoves";
import { randomAttack } from "@/utils/battle-function/randomAttack";
import { useContext, useEffect, useState } from "react";
import { changeHpServer } from "@/utils/battle-function/changeHpServer";
import { PokemonContext } from "@/contexts/PokemonContext";
import { NpcBattleState } from "@/types/enums/npcBattleState";

const useEnemyBattle = () => {
  const context = useContext(BattleContext);
  const pokemonContext = useContext(PokemonContext);

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

    const selectedMove = randomAttack(moves);
    setMove(selectedMove);

    if (currentPokemon?.actualHp === 0 || context.enemyPokemon.actualHp === 0) {
      context.setStopBattle(true);
      context.setBattleState(NpcBattleState.USER_POKEMON_FAINTED);
    }

    if (move && currentPokemon) {
      const interval = setInterval(async () => {
        if (move?.damage && !context.stopBattle) {
          let newHp = Math.max(currentPokemon?.actualHp - move.damage);
          setCurrentPokemon({ ...currentPokemon, actualHp: newHp });

          context.setEnemyAttackAnimation(true);
          setTimeout(() => {
            context.setEnemyAttackAnimation(false);
          }, 1500);
          console.log("new hp: ", newHp);

          try {
            const updatedPokemon = await changeHpServer(
              currentPokemon.id,
              newHp
            );

            if (updatedPokemon) {
              console.log("all correct");
            }
          } catch (error) {
            console.error("error occurs: ", error);
          }
          if (newHp === 0) {
            clearInterval(interval);
            context.setStopBattle(true);
            context.setBattleState(NpcBattleState.USER_POKEMON_FAINTED);
          }
        }
      }, move?.recoveryTime * 1000);

      return () => clearInterval(interval);
    }
  }, [context]);
};

export default useEnemyBattle;
