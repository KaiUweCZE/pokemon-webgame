import coinsImg from "@/assets/images/icons/coins.webp";
import pokeballsImg from "@/assets/images/icons/pokeball.webp";
import energyImg from "@/assets/images/items/energy-drink.webp";
import potionImg from "@/assets/images/items/potion.webp";
import { catchPokemon } from "@/utils/battle-function/catchPokemon";

export const itemData = [
  {
    id: 0,
    name: "coins",
    img: coinsImg,
  },
  {
    id: 1,
    name: "pokeball",
    img: pokeballsImg,
    func: catchPokemon,
    cost: 10,
  },
  {
    id: 2,
    name: "potion",
    img: potionImg,
    cost: 10,
  },
  {
    id: 3,
    name: "energy drink",
    img: energyImg,
    cost: 10,
  },
];
