import { itemImages } from "@/images/items";
import { type ItemName } from "@/types/item";
import { type StaticImageData } from "next/image";

interface ItemData {
  name: ItemName;
  description: string;
  category: string;
  img: {
    src: StaticImageData;
    alt: string;
  };
}

export const itemData = {
  coins: {
    name: "coins",
    description: "Coins can be found in the coins bag in some locations.",
    category: "key",
    img: itemImages["coins"],
  },
  pokeball: {
    name: "pokeball",
    description: "Used to catch Pokémon",
    category: "pokeball",
    img: itemImages["pokeball"],
  },
  "great ball": {
    name: "great ball",
    description: "Used to catch Pokémon",
    category: "pokeball",
    img: itemImages["great ball"],
  },
  potion: {
    name: "potion",
    description: "Heals a single Pokemon.",
    category: "consumable",
    img: itemImages["potion"],
  },
  "super potion": {
    name: "super potion",
    description: "Heals a single Pokemon.",
    category: "consumable",
    img: itemImages["super potion"],
  },
  "energy drink": {
    name: "energy drink",
    description: "Heals a single Pokemon.",
    category: "consumable",
    img: itemImages["energy drink"],
  },
  antidote: {
    name: "antidote",
    description: "Cures poisoned Pokemon.",
    category: "consumable",
    img: itemImages["antidote"],
  },
  paraheal: {
    name: "paraheal",
    description: "Cures paralyzed Pokemon.",
    category: "consumable",
    img: itemImages["paraheal"],
  },
  coffee: {
    name: "coffee",
    description: "Heals a single Pokemon.",
    category: "consumable",
    img: itemImages["coffee"],
  },
  "electric stone": {
    name: "electric stone",
    description: "Used to evolve Pokemon.",
    category: "consumable",
    img: itemImages["electric stone"],
  },
  "fire stone": {
    name: "fire stone",
    description: "Used to evolve Pokemon.",
    category: "consumable",
    img: itemImages["fire stone"],
  },
  "grass stone": {
    name: "grass stone",
    description: "Used to evolve Pokemon.",
    category: "consumable",
    img: itemImages["grass stone"],
  },
  "ice stone": {
    name: "ice stone",
    description: "Used to evolve Pokemon.",
    category: "consumable",
    img: itemImages["ice stone"],
  },
} satisfies Record<ItemName, ItemData>;
