import { useContext, useEffect } from "react";
import { NpcBattleContext } from "../NpcBattleContext";
import { NpcBattleState } from "@/types/enums/npcBattleState";

const useChangeOponentPokemon = () => {
  const context = useContext(NpcBattleContext);

  useEffect(() => {
    if (!context) return;

    console.log("useNpcBattle hook has started");

    const enemy = context.currentOponentPokemon;
    const setEnemy = context.setCurrentOponentPokemon;
    const enemies = context.oponentPokemons;
    const setEnemies = context.setOponentPokemons;

    const updatedEnemies = enemies?.map((e) =>
      e.name === enemy?.name ? { ...e, actualHp: enemy.actualHp } : e
    );
    if (updatedEnemies) {
      setEnemies(updatedEnemies);
    }

    if (enemy && enemy?.actualHp <= 0) {
      context.setBattleState(NpcBattleState.OPPONENT_SWITCHING_POKEMON);
      setTimeout(() => {
        context.setBattleState(NpcBattleState.BATTLE);
      }, 2000);
      // beware of this modification to an enemy Pokémon with a name, it could affect multiple Pokémon with the same name
      const nextEnemy = updatedEnemies?.find((e) => e.actualHp > 0);
      console.log("enemyHp is 0", nextEnemy);
      if (nextEnemy) {
        setEnemy(nextEnemy);
      }
    }
  }, [context?.currentOponentPokemon]);
};

export default useChangeOponentPokemon;
