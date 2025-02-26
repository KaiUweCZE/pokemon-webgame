import { useToast } from "@/components/providers/toast-provider";
import { healSix } from "@/utils/actions/heal-pokemon-six";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useHealSix = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [healingStatus, setHealingStatus] = useState<"success" | "error" | "warning" | null>(null);

  const mutationHealSix = useMutation({
    mutationFn: async () => {
      const result = await healSix();
      return result;
    },
    onSuccess: () => {
      setHealingStatus("success");
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      showToast("Pokemon were healed!", "success");
    },
    onError: (error) => {
      setHealingStatus("error");
      showToast(error instanceof Error ? error.message : "Failed to heal", "error");
    },
  });

  return {
    healSix: () => mutationHealSix.mutate(),
    isLoading: mutationHealSix.isPending,
    status: healingStatus,
  };
};
