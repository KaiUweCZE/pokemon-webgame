import { useToast } from "@/components/providers/toast-provider";
import { Item, ItemName } from "@/types/item";
import { getItem } from "@/utils/items/item-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type GettingItem = {
  itemName: ItemName;
  quantity: number;
};

export const useGetItem = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const getItemMutation = useMutation({
    mutationFn: async ({ item, userId }: { item: GettingItem; userId: string }) => {
      const updatedItem = await getItem(item, userId);

      console.log("Items were updated:", updatedItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError(error) {
      showToast(error instanceof Error ? error.message : "Failed to get item", "error");
    },
  });

  return {
    getItem: getItemMutation.mutate,
    isLoading: getItemMutation.isPending,
  };
};
