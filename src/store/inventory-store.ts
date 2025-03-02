"use client";
import { Store } from "@tanstack/store";
import { useStore } from "@tanstack/react-store";
import { Item, ItemCategory, ItemName } from "@/types/item";

export interface InventoryStore {
  items: Item[] | null;
  itemDetail: Item | null;
  itemDescription: string;
  activeCategory: ItemCategory | null;
  visibleItems: Item[] | null;
}

export const inventoryStore = new Store<InventoryStore>({
  items: null,
  itemDetail: null,
  itemDescription: "",
  activeCategory: null,
  visibleItems: null,
});

export const setItemDescription = (description: string) => {
  inventoryStore.setState((state) => ({
    ...state,
    itemDescription: description,
  }));
};

export const setItems = (items: Item[]) => {
  inventoryStore.setState((state) => ({
    ...state,
    items,
  }));
};

export const setActiveCategory = (category: ItemCategory | null) => {
  inventoryStore.setState((state) => ({
    ...state,
    activeCategory: category,
  }));
};

export const setVisibleItems = (items: Item[] | null) => {
  inventoryStore.setState((state) => ({
    ...state,
    visibleItems: items,
  }));
};

export const useInventoryStore = () => {
  const state = useStore(inventoryStore);

  return {
    ...state,
    items: state.items,
    itemDescription: state.itemDescription,
    activeCategory: state.activeCategory,
    visibleItems: state.visibleItems,
    hasItems: state.items !== null && state.items.length > 0,
    getItemByName: (name: ItemName) => state.items?.find((item) => item.name === name) ?? null,
    getBattleItems: () => state.items?.filter((item) => item.battleUsage),
    getCatchItems: () => state.items?.filter((item) => item.battleUsage === "catch"),
    getHealItems: () => state.items?.filter((item) => item.battleUsage === "heal"),
  };
};
