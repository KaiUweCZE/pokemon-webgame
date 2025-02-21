import coffeeImg from "./coffee.webp";
import pokeballImg from "./pokeball.webp";
import energydrinkImg from "./energy-drink.webp";
import potionImg from "./potion.webp";
import coinsImg from "./coins.webp";
import { ItemName } from "@/types/item";
import { StaticImageData } from "next/image";

export const itemImages = {
  coffee: {
    src: coffeeImg,
    alt: "coffee",
  },
  pokeball: {
    src: pokeballImg,
    alt: "pokeball",
  },
  "great ball": {
    src: pokeballImg,
    alt: "great ball",
  },
  "energy drink": {
    src: energydrinkImg,
    alt: "energy drink",
  },
  potion: {
    src: potionImg,
    alt: "potion",
  },
  "super potion": {
    src: potionImg,
    alt: "super potion",
  },
  antidote: {
    src: potionImg,
    alt: "antidote",
  },
  paraheal: {
    src: potionImg,
    alt: "paraheal",
  },
  "electric stone": {
    src: potionImg,
    alt: "electric stone",
  },
  "fire stone": {
    src: potionImg,
    alt: "fire stone",
  },
  "grass stone": {
    src: potionImg,
    alt: "grass stone",
  },
  "ice stone": {
    src: potionImg,
    alt: "ice stone",
  },
  coins: {
    src: coinsImg,
    alt: "coins",
  },
} satisfies Record<ItemName, { src: string | StaticImageData; alt: string }>;
