import { useToast } from "@/components/providers/toast-provider";
import { setBattleStatus } from "@/store/battle/actions/battle-state";
import { useBattleStore } from "@/store/battle/battle-store";
import { BattleStatus } from "@/store/battle/type";
import { addPokemon } from "@/utils/actions/add-pokemon";
import { calculateCatchRate, handleCatchPokemon } from "@/utils/catch-pokemon";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCatchPokemon = () => {
  const queryClient = useQueryClient();
  const { enemyPokemon, battleStatus } = useBattleStore();
  const { showToast } = useToast();
  const handleAnimation = (status: BattleStatus, duration = 5000) => {
    setTimeout(() => setBattleStatus(status), duration);
  };

  const catchPokemonMutation = useMutation({
    mutationFn: async () => {
      if (!enemyPokemon || battleStatus === "catching") return null;
      setBattleStatus("catching");

      const hpRemaining = (enemyPokemon.currentHp / enemyPokemon.maxHp) * 100;
      const catchRate = calculateCatchRate(hpRemaining);

      const resultOfCatch = handleCatchPokemon(catchRate);

      if (!resultOfCatch) {
        handleAnimation("in-progress");
        console.log("failed to catch");
        return null;
      }

      handleAnimation("pokemon-caught");
      const result = await addPokemon(enemyPokemon);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error) => {
      handleAnimation("in-progress");
      showToast(error instanceof Error ? error.message : "Failed to catch Pokemon", "error");
    },
  });

  return {
    catchPokemon: () => catchPokemonMutation.mutate(),
    isLoading: catchPokemonMutation.isPending,
    error: catchPokemonMutation.error,
  };
};
