import { useToast } from "@/components/providers/toast-context";
import { updateUserPokemonClient } from "@/store/battle/actions/battle-pokemon-actions";
import { setGainedExp, setNewLevel } from "@/store/battle/actions/battle-state";
import { useBattleStore } from "@/store/battle/battle-store";
import { updateUserPokemon } from "@/utils/actions/battle/battle-actions";
import { roundNumber } from "@/utils/helper/round-number";
import { calculateExpGain, calculateExpToNextLevel } from "@/utils/pokemon-exp";
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

      console.log("Gained exp:", gainedExp, roundNumber(gainedExp, 2));

      setGainedExp(roundNumber(gainedExp, 2));

      const expToNextLevel = calculateExpToNextLevel(userPokemon.name, userPokemon.level);
      const totalExp = userPokemon.currentExp + gainedExp;

      let newLevel = userPokemon.level;
      let remainingExp = totalExp;

      if (totalExp >= expToNextLevel) {
        setNewLevel(true);
        newLevel = userPokemon.level + 1;
        remainingExp -= expToNextLevel;
      }

      updateUserPokemonClient({
        currentExp: remainingExp,
        level: newLevel,
      });

      const result = await updateUserPokemon(userPokemon.id, {
        currentExp: remainingExp,
        level: newLevel,
      });

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
    getExp: () => getExp.mutate(),
    isLoading: getExp.isPending,
    error: getExp.error,
  };
};

export default useGetExp;
