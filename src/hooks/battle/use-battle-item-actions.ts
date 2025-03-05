import { Item } from "@/types/item";
import { useCatchPokemon } from "./use-catch-pokemon";
import { useHealPokemon } from "./use-heal-pokemon";
import { useToast } from "@/components/providers/toast-provider";
import { setItems, useInventoryStore } from "@/store/inventory-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInventoryItem } from "@/utils/items/item-actions";
import { useBattleStore } from "@/store/battle/battle-store";
import { isPokeballType, PokeballType } from "@/utils/catch-pokemon";

export const useBattleItemActions = () => {
  const { battleStatus } = useBattleStore();
  const { catchPokemon } = useCatchPokemon();
  const { healPokemon } = useHealPokemon();
  const { showToast } = useToast();
  const { items } = useInventoryStore();
  const queryClient = useQueryClient();

  const updateItemMutation = useMutation({
    mutationFn: async (item: Item) => {
      if (!item.battleUsage) return null;

      return await updateInventoryItem({ itemName: item.name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error) => {
      showToast(`Error updating item: ${error}`, "error");
    },
  });

  const handleItemUse = (item: Item) => {
    if (!item.battleUsage || !items) return;

    if (battleStatus !== "in-progress") {
      showToast("You can only use items in an ongoing battle", "error");
      return;
    }

    // check if user has the item
    const currentItem = items.find((i) => i.name === item.name);
    if (!currentItem || (currentItem.quantity || 0) <= 0) {
      showToast(`You don't have any ${item.name} left!`, "error");
      return;
    }

    let actionSuccessful = false;

    try {
      switch (item.battleUsage) {
        case "catch":
          if (isPokeballType(item.name)) {
            catchPokemon(item.name);
          }
          break;
        case "heal":
          healPokemon(item);
          break;
        default:
          showToast(`Item ${item.name} cannot be used in battle`, "error");
          break;
      }

      if (actionSuccessful) {
        const updatedItems = items.map((i) =>
          i.name === item.name
            ? { ...item, quantity: (item.quantity && item.quantity - 1) || 0 }
            : i
        );
        setItems(updatedItems);

        updateItemMutation.mutate(item);
      }
    } catch (error) {
      showToast("Failed to use item", "error");
      console.error("Error using item:", error);
    }
  };

  return { handleItemUse };
};
