import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nextDay, spentPartOfDay } from "@/utils/actions/day-actions";
import { useCurrentUser } from "./use-current-user";
import { useToast } from "@/components/providers/toast-context";

export const useDay = () => {
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUser();
  const { showToast } = useToast();

  const nextDayMutation = useMutation({
    mutationFn: async () => {
      return await nextDay();
    },
    onSuccess: () => {
      showToast("Good morning!", "success");
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError(error) {
      showToast(error instanceof Error ? error.message : "Failed to start your journey", "error");
    },
  });

  const spentPartOfDayMutation = useMutation({
    mutationFn: async () => {
      return await spentPartOfDay();
    },
    onSuccess: () => {
      showToast("Time moves forward...", "success");
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError(error) {
      showToast(
        error instanceof Error ? error.message : "Failed to continue your journey",
        "warning",
        { headline: "It's too late" }
      );
    },
  });

  return {
    nextDay: nextDayMutation.mutate,
    spentPartOfDay: spentPartOfDayMutation.mutate,
    isUpdating: nextDayMutation.isPending,
  };
};
