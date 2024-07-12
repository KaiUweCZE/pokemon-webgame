import barnImg from "@/assets/images/countires/barn.webp";
import caveImg from "@/assets/images/countires/cave.webp";
import crossroadImg from "@/assets/images/countires/crossroad.webp";
import deepmineImg from "@/assets/images/countires/deepmine.webp";
import futuromeImg from "@/assets/images/countires/futurome.webp";
import bridgeImg from "@/assets/images/countires/bridge.webp";
import gastlytowerImg from "@/assets/images/countires/gastlytower.webp";
import gmountainImg from "@/assets/images/countires/gmountain.webp";
import chatotcastleImg from "@/assets/images/countires/chatotcastle.webp";
import iceScreamImg from "@/assets/images/countires/iceScream.webp";
import jungleImg from "@/assets/images/countires/jungle.webp";
import lakeImg from "@/assets/images/countires/lake.webp";
import lovelyImg from "@/assets/images/countires/lovely.webp";
import magicalForestImg from "@/assets/images/countires/magical-forest.webp";
import machoPichuImg from "@/assets/images/countires/macho-pichu.webp";
import monastryImg from "@/assets/images/countires/monastry.webp";
import northmandicImg from "@/assets/images/countires/northmandic.webp";
import redwoodsImg from "@/assets/images/countires/redwoods.webp";
import shireImg from "@/assets/images/countires/shire.webp";
import teleportImg from "@/assets/images/countires/teleport.webp";
import waterfallsImg from "@/assets/images/countires/waterfalls.webp";
import yummyImg from "@/assets/images/countires/yummy.webp";
import largeFarmImg from "@/assets/images/countires/large-farm.webp";

export const mapData = [
  {
    id: 0,
    name: "shire",
    routes: ["cave", "mountains"],
    img: shireImg,
    rounds: [
      {
        id: 0,
        pokemons: [5, 6],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [3, 5, 6],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [2, 4, 1],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [1, 3],
        levelRange: [31, 40],
      },
    ],
    fight: true,
  },
  {
    id: 1,
    name: "large farm",
    routes: ["shire", "bridge", "mountains"],
    img: largeFarmImg,
    rounds: [
      {
        id: 0,
        pokemons: [5, 6],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [3, 5, 6],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [2, 4, 1],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [1, 3],
        levelRange: [31, 40],
      },
    ],
    fight: true,
  },
  {
    id: 2,
    name: "mountains",
    routes: ["large farm", "cave", "bridge"],
    img: gmountainImg,
    rounds: [
      {
        id: 0,
        pokemons: [5, 6],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [3, 5, 6],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [2, 4, 1],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [1, 3],
        levelRange: [31, 40],
      },
    ],
    fight: true,
  },
  {
    id: 3,
    name: "cave",
    routes: ["mountain", "large farm"],
    img: caveImg,
    rounds: [
      {
        id: 0,
        pokemons: [5, 6],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [3, 5, 6],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [2, 4, 1],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [1, 3],
        levelRange: [31, 40],
      },
    ],
    fight: true,
  },
  {
    id: 4,
    name: "bridge",
    routes: ["mountain", "large farm", "lovely"],
    img: bridgeImg,
    rounds: [
      {
        id: 0,
        pokemons: [5, 6],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [3, 5, 6],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [2, 4, 1],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [1, 3],
        levelRange: [31, 40],
      },
    ],
    fight: true,
  },
  {
    id: 5,
    name: "lovely",
    routes: ["bridge", "willy's barn"],
    img: lovelyImg,
    rounds: [
      {
        id: 0,
        pokemons: [5, 6],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [3, 5, 6],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [2, 4, 1],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [1, 3],
        levelRange: [31, 40],
      },
    ],
    fight: true,
  },
  {
    id: 6,
    name: "willy's barn",
    routes: ["lake", "deep mine", "futurome", "waterfalls", "lovely"],
    img: barnImg,
    rounds: [
      {
        id: 0,
        pokemons: [5, 6],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [3, 5, 6],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [2, 4, 1],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [1, 3],
        levelRange: [31, 40],
      },
    ],
    fight: true,
  },
  {
    id: 7,
    name: "lake",
    routes: ["willy's barn", "deep mine", "gastly tower"],
    img: lakeImg,
    rounds: [
      {
        id: 0,
        pokemons: [5, 6],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [3, 5, 6],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [2, 4, 1],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [1, 3],
        levelRange: [31, 40],
      },
    ],
    fight: true,
  },
  {
    id: 8,
    name: "deep mine",
    routes: ["lake", "gastly tower"],
    img: deepmineImg,
    rounds: [
      {
        id: 0,
        pokemons: [5, 6],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [3, 5, 6],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [2, 4, 1],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [1, 3],
        levelRange: [31, 40],
      },
    ],
    fight: true,
  },
  {
    id: 9,
    name: "gastly tower",
    routes: ["lake", "deep mine", "magical forest"],
    img: gastlytowerImg,
    rounds: [
      {
        id: 0,
        pokemons: [5, 6],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [3, 5, 6],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [2, 4, 1],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [1, 3],
        levelRange: [31, 40],
      },
    ],
    fight: true,
  },
  {
    id: 10,
    name: "magical forst",
    routes: ["ice scream", "gastly tower"],
    img: magicalForestImg,
    rounds: [
      {
        id: 0,
        pokemons: [5, 6],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [3, 5, 6],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [2, 4, 1],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [1, 3],
        levelRange: [31, 40],
      },
    ],
    fight: true,
  },
  {
    id: 11,
    name: "ice scream",
    routes: ["gastly tower"],
    img: iceScreamImg,
    rounds: [
      {
        id: 0,
        pokemons: [5, 6],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [3, 5, 6],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [2, 4, 1],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [1, 3],
        levelRange: [31, 40],
      },
    ],
    fight: true,
  },
  {
    id: 12,
    name: "waterfalls",
    routes: ["ice scream", "monastry", "willy's barn"],
    img: waterfallsImg,
    rounds: [
      {
        id: 0,
        pokemons: [5, 6],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [3, 5, 6],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [2, 4, 1],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [1, 3],
        levelRange: [31, 40],
      },
    ],
    fight: true,
  },
  {
    id: 13,
    name: "monastry",
    routes: ["waterfalls", "ice sream", "northmandic", "chatot castle"],
    img: monastryImg,
    rounds: [
      {
        id: 0,
        pokemons: [5, 6],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [3, 5, 6],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [2, 4, 1],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [1, 3],
        levelRange: [31, 40],
      },
    ],
    fight: true,
  },
  {
    id: 14,
    name: "northmandic",
    routes: ["teleport", "monastry", "chatot castle"],
    img: northmandicImg,
    rounds: [
      {
        id: 0,
        pokemons: [5, 6],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [3, 5, 6],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [2, 4, 1],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [1, 3],
        levelRange: [31, 40],
      },
    ],
    fight: true,
  },
  {
    id: 15,
    name: "teleport",
    routes: ["northmandic", "chatot castle"],
    img: teleportImg,
    rounds: [
      {
        id: 0,
        pokemons: [5, 6],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [3, 5, 6],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [2, 4, 1],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [1, 3],
        levelRange: [31, 40],
      },
    ],
    fight: true,
  },
  {
    id: 16,
    name: "chatot castle",
    routes: ["northmandic", "lovely", "monastry", "jungle"],
    img: chatotcastleImg,
    rounds: [
      {
        id: 0,
        pokemons: [5, 6],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [3, 5, 6],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [2, 4, 1],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [1, 3],
        levelRange: [31, 40],
      },
    ],
    fight: true,
  },
  {
    id: 17,
    name: "jungle",
    routes: ["macho pichu", "chatot castle"],
    img: jungleImg,
    rounds: [
      {
        id: 0,
        pokemons: [5, 6],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [3, 5, 6],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [2, 4, 1],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [1, 3],
        levelRange: [31, 40],
      },
    ],
    fight: true,
  },
  {
    id: 18,
    name: "macho pichu",
    routes: ["redwoods", "jungle"],
    img: machoPichuImg,
    rounds: [
      {
        id: 0,
        pokemons: [5, 6],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [3, 5, 6],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [2, 4, 1],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [1, 3],
        levelRange: [31, 40],
      },
    ],
    fight: true,
  },
  {
    id: 19,
    name: "redwoods",
    routes: ["macho pichu", "yummy desert"],
    img: redwoodsImg,
    rounds: [
      {
        id: 0,
        pokemons: [5, 6],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [3, 5, 6],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [2, 4, 1],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [1, 3],
        levelRange: [31, 40],
      },
    ],
    fight: true,
  },
  {
    id: 20,
    name: "yummy desert",
    routes: ["redwoods"],
    img: yummyImg,
    rounds: [
      {
        id: 0,
        pokemons: [5, 6],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [3, 5, 6],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [2, 4, 1],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [1, 3],
        levelRange: [31, 40],
      },
    ],
    fight: true,
  },
];
