import { useToast } from "@/components/providers/toast-provider";
import { ItemName } from "@/types/item";
import { transferItem } from "@/utils/items/item-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface TransferItem {
  name: ItemName;
  quantity: number;
  totalPrice: number;
}

export const useTransfer = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const transferMutation = useMutation({
    mutationFn: async ({
      state,
      item,
      userId,
    }: {
      state: "buy" | "sell";
      item: TransferItem;
      userId: string;
    }) => {
      const totalCost = state === "buy" ? -item.totalPrice : item.totalPrice;
      const quantity = state === "buy" ? item.quantity : -item.quantity;
      const result = await transferItem({ itemName: item.name, quantity }, totalCost);
      console.log("Items were updated:", result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      showToast("Items were updated!", "success");
    },
    onError: (error) => {
      showToast(error instanceof Error ? error.message : "Failed to transfer", "error");
    },
  });
  return {
    transfer: transferMutation.mutate,
    isLoading: transferMutation.isPending,
  };
};
