import { itemData } from "@/data/items/item-data";
import { InventoryItem, Item } from "@/types/item";

export const transformToStaticItem = (item: InventoryItem[]): Item[] => {
  const items = item.map((i) => {
    const basic = itemData[i.name];
    return {
      ...basic,
      quantity: i.quantity,
      metadata: i.metadata,
    };
  });

  return items;
};
