import {
  updateEnemyPokemon,
  updateUserPokemonClient,
} from "@/store/battle/actions/battle-pokemon-actions";
import { useBattleStore } from "@/store/battle/battle-store";
import { calculateDamage } from "@/utils/battle/damage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BattlePokemon } from "@/types/pokemon";
import { updateUserPokemon } from "@/utils/actions/battle/battle-actions";
import { setBattleStatus } from "@/store/battle/actions/battle-state";
import { battleLogger } from "@/utils/loggers/battle-logger";

export const useUserPokemonAttack = () => {
  const queryClient = useQueryClient();
  const { userPokemon, enemyPokemon, currentAttack } = useBattleStore();

  const updatePokemonMutation = useMutation({
    mutationFn: async () => {
      if (!userPokemon || !enemyPokemon || !currentAttack) return null;

      const { finalDamage } = calculateDamage(userPokemon, enemyPokemon, currentAttack);
      const newUserPokemonEnergy = Math.max(
        0,
        userPokemon.currentEnergy - currentAttack.energyCost
      );
      const newEnemyHp = Math.max(0, enemyPokemon.currentHp - finalDamage);
      const updatedUserPokemon: BattlePokemon = {
        ...userPokemon,
        currentEnergy: newUserPokemonEnergy,
      };

      updateEnemyPokemon({
        ...enemyPokemon,
        currentHp: newEnemyHp,
      });

      if (newEnemyHp === 0) {
        setBattleStatus("user-victory");
      }

      updateUserPokemonClient(updatedUserPokemon);

      const { attackCooldowns, id, image, ...updateData } = updatedUserPokemon;

      const result = await updateUserPokemon(userPokemon.id, updateData);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error) => {
      battleLogger.error("User attack failed", error);
    },
  });

  return {
    performAttack: () => updatePokemonMutation.mutate(),
    isLoading: updatePokemonMutation.isPending,
    error: updatePokemonMutation.error,
  };
};
