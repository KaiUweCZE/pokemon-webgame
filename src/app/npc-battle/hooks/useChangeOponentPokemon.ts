import { useContext, useEffect } from "react";
import { NpcBattleContext } from "../NpcBattleContext";
import { BattleState } from "@/types/enums/battleState";

const useChangeOponentPokemon = () => {
  const context = useContext(NpcBattleContext);

  useEffect(() => {
    if (!context) return;

    console.log("useNpcBattle hook has started");

    const enemy = context.currentOponentPokemon;
    const setEnemy = context.setCurrentOponentPokemon;
    const enemies = context.oponentPokemons;
    const setEnemies = context.setOponentPokemons;

    if (!enemy || !enemies || enemies.length === 0) return;

    const updatedEnemies = enemies?.map((e) =>
      e.name === enemy?.name ? { ...e, actualHp: enemy.actualHp } : e
    );
    setEnemies(updatedEnemies);

    if (enemy?.actualHp <= 0) {
      const hasRemainingPokemon = updatedEnemies.some((e) => e.actualHp > 0);

      if (hasRemainingPokemon) {
        context.setBattleState(BattleState.OPPONENT_SWITCHING_POKEMON);

        setTimeout(() => {
          // beware of this modification to an enemy Pokémon with a name, it could affect multiple Pokémon with the same name
          const nextEnemy = updatedEnemies?.find((e) => e.actualHp > 0);
          if (nextEnemy) {
            setEnemy(nextEnemy);
            context.setBattleState(BattleState.BATTLE);
          }
        }, 2000);
      } else {
        // No more Pokemon left, end the battle
        context.setBattleState(BattleState.USER_VICTORY);
        console.log("All opponent Pokemon have fainted. User wins!");
      }
    }
  }, [context?.currentOponentPokemon]);
};

export default useChangeOponentPokemon;
