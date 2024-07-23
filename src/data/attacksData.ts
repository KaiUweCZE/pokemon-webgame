import normalImg from "@/assets/images/attacks/boom.webp";
import thunderImg from "@/assets/images/attacks/thunder.webp";

export const attacksData = [
  {
    name: "quick attack",
    type: "normal",
    damage: 10,
    energyCost: 1,
    recoveryTime: 3,
    img: normalImg,
  },
  {
    name: "tackle",
    type: "normal",
    damage: 2,
    energyCost: 2,
    recoveryTime: 3,
    img: normalImg,
  },
  {
    name: "thunder",
    type: "electric",
    damage: 3,
    energyCost: 3,
    recoveryTime: 3,
    img: thunderImg,
  },
  {
    name: "thunderbolt",
    type: "electric",
    damage: 4,
    energyCost: 4,
    recoveryTime: 3,
    img: thunderImg,
  },
];
