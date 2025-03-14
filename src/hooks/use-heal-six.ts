import { useToast } from "@/components/providers/toast-provider";
import { healSix } from "@/utils/actions/heal-pokemon-six";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";

export const useHealSix = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { data: user } = useCurrentUser();
  const [healingStatus, setHealingStatus] = useState<"success" | "error" | "warning" | null>(null);

  const canHeal = !!user && user.partOfDay < 2;

  const mutationHealSix = useMutation({
    mutationFn: async () => {
      const result = await healSix();
      return result;
    },
    onSuccess: (data) => {
      setHealingStatus("success");
      queryClient.invalidateQueries({ queryKey: ["current-user"] });

      showToast("Pokemon were healed!", "success");

      if (data.partOfDay >= 2) {
        showToast("That was your last activity for today.", "warning", {
          headline: "Daily limit reached",
        });
      }
    },
    onError: (error) => {
      setHealingStatus("error");
      showToast(error instanceof Error ? error.message : "Failed to heal", "error");
    },
  });

  const handleHealSix = () => {
    if (!canHeal) {
      showToast("No more activities available today. Wait for tomorrow.", "warning");
      return;
    }
    mutationHealSix.mutate();
  };

  return {
    healSix: handleHealSix,
    isLoading: mutationHealSix.isPending,
    status: healingStatus,
    canHeal,
  };
};
