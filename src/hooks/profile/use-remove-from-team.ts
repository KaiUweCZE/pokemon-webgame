import { useToast } from "@/components/providers/toast-provider";
import { setUserPokemonSix } from "@/store/battle/actions/battle-pokemon-actions";
import { useBattleStore } from "@/store/battle/battle-store";
import { removeFromTeam } from "@/utils/actions/remove-from-team";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRemoveFromTeam = () => {
  const queryClient = useQueryClient();
  const { userPokemonSix } = useBattleStore();
  const { showToast } = useToast();

  const removeFromTeamMutation = useMutation({
    mutationFn: async (pokemonId: string) => {
      const result = await removeFromTeam(pokemonId);

      const newTeam = userPokemonSix.filter((pokemon) => pokemon.id !== pokemonId);
      setUserPokemonSix(newTeam);
      return result.success;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error) => {
      showToast(
        error instanceof Error ? error.message : "Failed to remove pokemon from team",
        "error"
      );
    },
  });

  const removePokemon = (pokemonId: string) => {
    if (removeFromTeamMutation.isPending) return;
    removeFromTeamMutation.mutate(pokemonId);
  };

  return {
    removePokemon,
    isRemoving: removeFromTeamMutation.isPending,
  };
};
