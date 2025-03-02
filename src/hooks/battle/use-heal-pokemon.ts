import { useToast } from "@/components/providers/toast-provider";
import { updateUserPokemonClient } from "@/store/battle/actions/battle-pokemon-actions";
import { useBattleStore } from "@/store/battle/battle-store";
import { Item } from "@/types/item";
import { updateUserPokemon } from "@/utils/actions/battle/battle-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useHealPokemon = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { userPokemon } = useBattleStore();

  const healPokemonMutation = useMutation({
    mutationFn: async (item: Item) => {
      if (!userPokemon) return null;

      let healAmount = 0;
      switch (item.name) {
        case "potion":
          healAmount = 20;
          break;
        case "super potion":
          healAmount = 40;
          break;
        default:
          showToast(`Item ${item} cannot be used for healing`, "error");
          return null;
      }

      if (healAmount === 0) return null;

      const newHp = Math.min(userPokemon.maxHp, userPokemon.currentHp + healAmount);

      updateUserPokemonClient({
        ...userPokemon,
        currentHp: newHp,
      });

      const result = await updateUserPokemon(userPokemon.id, {
        currentHp: newHp,
      });

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error) => {
      showToast(error instanceof Error ? error.message : "Failed to heal", "error");
    },
  });

  return {
    healPokemon: (item: Item) => healPokemonMutation.mutate(item),
    isLoading: healPokemonMutation.isPending,
  };
};
