import coinsImg from "@/assets/images/icons/coins.webp";
import pokeballsImg from "@/assets/images/icons/pokeball.webp";
import energyImg from "@/assets/images/items/energy-drink.webp";
import potionImg from "@/assets/images/items/potion.webp";
import coffeeImg from "@/assets/images/items/coffee.webp";

export const itemData = [
  {
    id: 0,
    name: "coins",
    img: coinsImg,
    battleItem: false,
  },
  {
    id: 1,
    name: "pokeball",
    img: pokeballsImg,
    cost: 10,
    battleItem: true,
  },
  {
    id: 2,
    name: "potion",
    img: potionImg,
    cost: 10,
    battleItem: true,
  },
  {
    id: 3,
    name: "energy drink",
    img: energyImg,
    cost: 10,
    battleItem: true,
  },
  {
    id: 4,
    name: "coffee",
    img: coffeeImg,
    cost: 15,
    battleItem: false,
  },
];
