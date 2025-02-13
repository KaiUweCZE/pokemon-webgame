import { useToast } from "@/components/providers/toast-context";
import { useBattleStore } from "@/store/battle/battle-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useGetExp = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { userPokemon, enemyPokemon } = useBattleStore();

  const getExp = useMutation({
    mutationFn: async () => {
      if (!userPokemon) return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error) => {
      showToast(error instanceof Error ? error.message : "Failed to get exp", "error");
    },
  });
};

export default useGetExp;
