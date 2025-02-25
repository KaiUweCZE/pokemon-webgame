import { useToast } from "@/components/providers/toast-provider";
import { updateUserPokemonClient } from "@/store/battle/actions/battle-pokemon-actions";
import { useBattleStore } from "@/store/battle/battle-store";
import { updateUserPokemon } from "@/utils/actions/battle/battle-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useHandleRest = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { userPokemon } = useBattleStore();

  const handleRestMutation = useMutation({
    mutationFn: async () => {
      if (!userPokemon) return null;

      const newEnergy = Math.min(userPokemon.maxEnergy, userPokemon.currentEnergy + 6);

      updateUserPokemonClient({
        ...userPokemon,
        currentEnergy: newEnergy,
      });

      const result = await updateUserPokemon(userPokemon.id, {
        currentEnergy: newEnergy,
      });
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error) => {
      showToast(error instanceof Error ? error.message : "Failed to rest", "error");
    },
  });

  return {
    handleRest: handleRestMutation.mutateAsync,
    isLoading: handleRestMutation.isPending,
    error: handleRestMutation.error,
  };
};
