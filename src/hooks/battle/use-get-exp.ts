import { useToast } from "@/components/providers/toast-provider";
import { updateUserPokemonClient } from "@/store/battle/actions/battle-pokemon-actions";
import { setGainedExp, setNewLevel } from "@/store/battle/actions/battle-state";
import { useBattleStore } from "@/store/battle/battle-store";
import { updateUserPokemon } from "@/utils/actions/battle/battle-actions";
import { roundNumber } from "@/utils/helper/round-number";
import { calculateExpGain, calculateExpToNextLevel } from "@/utils/pokemon-exp";
import { getNewStats } from "@/utils/pokemon-stats";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useGetExp = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { userPokemon, enemyPokemon } = useBattleStore();

  const getExp = useMutation({
    mutationFn: async () => {
      if (!userPokemon || !enemyPokemon) return null;

      const gainedExp = calculateExpGain(
        userPokemon.name,
        userPokemon.level,
        enemyPokemon.name,
        enemyPokemon.level
      );
      setGainedExp(roundNumber(gainedExp, 2));

      // check if the user has leveled up or will be add only exp
      const expToNextLevel = calculateExpToNextLevel(userPokemon.name, userPokemon.level);
      const totalExp = userPokemon.currentExp + gainedExp;

      let newLevel = userPokemon.level;
      let remainingExp = totalExp;

      // level up
      const hasLevelUp = totalExp >= expToNextLevel;
      let newStats = null;

      if (hasLevelUp) {
        setNewLevel(true);
        newLevel = userPokemon.level + 1;
        remainingExp -= expToNextLevel;
        // if level up => calculate new battle stats(maxHp, maxEnergy, dmg, defense, speed)
        newStats = getNewStats(userPokemon.level, newLevel, userPokemon);
      }

      const updates = {
        currentExp: remainingExp,
        level: newLevel,
        ...(newStats || {}),
      };

      updateUserPokemonClient(updates);

      const result = await updateUserPokemon(userPokemon.id, updates);

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error) => {
      showToast(error instanceof Error ? error.message : "Failed to get exp", "error");
    },
  });

  return {
    getExp: () => {
      if (!getExp.isPending) {
        getExp.mutate();
      }
    },
    isLoading: getExp.isPending,
    error: getExp.error,
  };
};

export default useGetExp;
