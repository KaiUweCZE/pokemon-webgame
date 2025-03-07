import { useToast } from "@/components/providers/toast-provider";
import { setUserPokemonSix } from "@/store/battle/actions/battle-pokemon-actions";
import { useBattleStore } from "@/store/battle/battle-store";
import { Pokemon } from "@/types/pokemon";
import { addPokemonToTeam } from "@/utils/actions/add-pokemon";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface MutationContext {
  previousPokemonSix: Pokemon[];
}

export const useAddToTeam = () => {
  const queryClient = useQueryClient();
  const { userPokemonSix } = useBattleStore();
  const { showToast } = useToast();

  const addToTeamMutation = useMutation<boolean, Error, Pokemon, MutationContext>({
    mutationFn: async (pokemon: Pokemon) => {
      const result = await addPokemonToTeam(pokemon.id);
      return result.success;
    },
    onMutate: (pokemon) => {
      const previousPokemonSix = [...userPokemonSix];
      const updatedPokemon = { ...pokemon, isActive: true };

      setUserPokemonSix([...userPokemonSix, updatedPokemon]);

      return { previousPokemonSix };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error, pokemon, context) => {
      if (context?.previousPokemonSix) {
        setUserPokemonSix(context.previousPokemonSix);
      }
      showToast(error instanceof Error ? error.message : "Failed to add pokemon to team", "error");
    },
  });

  const handleAddPokemon = (pokemon: Pokemon) => {
    if (userPokemonSix.length >= 6) {
      showToast("You don't have any more space in your team", "error");
      return;
    }
    if (userPokemonSix.some((p) => p.id === pokemon.id)) {
      showToast("Pokemon is already in team", "error");
      return;
    }

    addToTeamMutation.mutate(pokemon);
  };

  return {
    addToTeam: (pokemon: Pokemon) => handleAddPokemon(pokemon),
    isAdding: addToTeamMutation.isPending,
  };
};
