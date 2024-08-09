import barnImg from "@/assets/images/countires/barn.webp";
import caveImg from "@/assets/images/countires/cave.webp";
import swampImg from "@/assets/images/countires/swamp.webp";
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
import safariImg from "@/assets/images/countires/safari.webp";

export const mapData = [
  {
    id: 0,
    name: "shire",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "Market", "Poke Centrum", "NPC", "Battle"],
    npcs: ["Sheriff", "prof. Bloom", "Hank"],
    marketItems: ["pokeball", "potion"],
    routes: ["cave", "mountains", "large farm"],
    img: shireImg,
    rounds: [
      {
        id: 0,
        pokemons: [27, 133, 216],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [25, 63, 133],
        levelRange: [11, 15],
      },
      {
        id: 2,
        pokemons: [280, 25, 216],
        levelRange: [15, 19],
      },
      {
        id: 3,
        pokemons: [1, 4, 7, 25],
        levelRange: [5, 7],
      },
    ],
    fight: true,
    completePokemonList: [27, 63, 25, 280, 281, 387, 95, 28],
  },
  {
    id: 1,
    name: "large farm",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "NPC", "Battle"],
    npcs: ["Joel", "Lord"],
    marketItems: ["pokeball", "potion"],
    routes: ["shire", "bridge", "mountains"],
    img: largeFarmImg,
    rounds: [
      {
        id: 0,
        pokemons: [27, 63],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [63, 25, 280],
        levelRange: [11, 15],
      },
      {
        id: 2,
        pokemons: [281, 387, 95],
        levelRange: [15, 20],
      },
      {
        id: 3,
        pokemons: [95, 28],
        levelRange: [20, 30],
      },
    ],
    fight: true,
    completePokemonList: [27, 63, 25, 280, 281, 387, 95, 28],
  },
  {
    id: 2,
    name: "mountains",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "NPC", "Battle"],
    npcs: ["Samuel", "Wee", "Miner Tom"],
    marketItems: ["pokeball", "potion"],
    routes: ["large farm", "cave", "bridge"],
    img: gmountainImg,
    rounds: [
      {
        id: 0,
        pokemons: [74, 27],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [74, 27, 95],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [111, 75, 95],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [28, 95, 112],
        levelRange: [30, 35],
      },
    ],
    fight: true,
    completePokemonList: [27, 74, 95, 75, 111, 28, 112],
  },
  {
    id: 3,
    name: "cave",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "NPC", "Battle"],
    npcs: ["Samuel", "Wee", "Miner Tom"],
    marketItems: ["pokeball", "potion"],
    routes: ["mountains", "large farm"],
    img: caveImg,
    rounds: [
      {
        id: 0,
        pokemons: [27, 74, 104],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [4, 27, 104, 74],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [28, 4, 111, 95],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [324, 624, 5, 75],
        levelRange: [31, 40],
      },
    ],
    fight: true,
    completePokemonList: [4, 27, 5, 74, 104, 111, 324, 624, 28],
  },
  {
    id: 4,
    name: "bridge",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "NPC", "Battle"],
    npcs: ["Samuel", "Wee"],
    marketItems: ["pokeball", "potion"],
    routes: ["mountains", "large farm", "lovely", "swamp"],
    img: bridgeImg,
    rounds: [
      {
        id: 0,
        pokemons: [98, 63, 280],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [280, 63, 209],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [209, 216, 281],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [210, 2, 388],
        levelRange: [31, 40],
      },
    ],
    fight: true,
    completePokemonList: [98, 63, 209, 280, 281, 388, 210, 2, 216],
  },
  {
    id: 5,
    name: "lovely",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "Market", "Poke Centrum", "NPC", "Battle"],
    npcs: ["Sheriff", "Anna", "Princess"],
    marketItems: ["pokeball", "potion"],
    routes: ["bridge", "willy's barn", "swamp"],
    img: lovelyImg,
    rounds: [
      {
        id: 0,
        pokemons: [133, 216, 957],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [1, 133, 216, 280, 209],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [175, 958, 238],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [281, 2, 959],
        levelRange: [31, 40],
      },
    ],
    fight: true,
    completePokemonList: [
      1, 133, 957, 175, 209, 958, 959, 123, 216, 64, 238, 280, 281, 2,
    ],
  },
  {
    id: 6,
    name: "willy's barn",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "NPC", "Battle"],
    npcs: ["Willy"],
    marketItems: ["pokeball", "potion"],
    routes: ["lake", "deep mine", "futurome", "waterfalls", "lovely"],
    img: barnImg,
    rounds: [
      {
        id: 0,
        pokemons: [387, 273, 595, 32],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [595, 274, 273, 66],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [595, 33, 123, 127],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [123, 127, 596],
        levelRange: [31, 40],
      },
    ],
    fight: true,
    completePokemonList: [],
  },
  {
    id: 7,
    name: "lake",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "NPC", "Battle"],
    npcs: ["Pepe", "Samuel", "Wee"],
    marketItems: ["pokeball", "potion"],
    routes: ["willy's barn", "deep mine", "gastly tower", "futurome"],
    img: lakeImg,
    rounds: [
      {
        id: 0,
        pokemons: [7, 63, 66, 98],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [98, 5, 67, 109, 209],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [98, 8, 99],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [9, 99, 67],
        levelRange: [31, 40],
      },
    ],
    fight: true,
    completePokemonList: [],
  },
  {
    id: 8,
    name: "deep mine",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "Market", "NPC", "Battle"],
    npcs: ["Sheriff", "Samuel", "Wee"],
    marketItems: ["pokeball", "potion"],
    routes: ["lake", "gastly tower"],
    img: deepmineImg,
    rounds: [
      {
        id: 0,
        pokemons: [387, 273, 595, 32],
        levelRange: [5, 10],
      },
      {
        id: 1,
        pokemons: [595, 274, 273, 66],
        levelRange: [11, 20],
      },
      {
        id: 2,
        pokemons: [67, 33, 1],
        levelRange: [21, 30],
      },
      {
        id: 3,
        pokemons: [1, 3],
        levelRange: [31, 40],
      },
    ],
    fight: true,
    completePokemonList: [],
  },
  {
    id: 9,
    name: "gastly tower",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "NPC", "Battle"],
    npcs: ["Isabella", "Nana", "Wee"],
    marketItems: ["pokeball", "potion", "energy drink"],
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
    completePokemonList: [],
  },
  {
    id: 10,
    name: "magical forest",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "NPC", "Battle"],
    npcs: ["Bob", "Jude", "Wee"],
    marketItems: ["pokeball", "potion"],
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
    completePokemonList: [],
  },
  {
    id: 11,
    name: "ice scream",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "Market", "Poke Centrum", "NPC", "Battle"],
    npcs: ["Sheriff", "Amendsen", "Wee"],
    marketItems: ["pokeball", "potion"],
    routes: ["gastly tower", "monastry", "waterfalls"],
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
    completePokemonList: [],
  },
  {
    id: 12,
    name: "waterfalls",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "NPC", "Battle"],
    npcs: ["Michael", "Pepe"],
    marketItems: ["pokeball", "potion"],
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
    completePokemonList: [8],
  },
  {
    id: 13,
    name: "monastry",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "Market", "Poke Centrum", "NPC", "Battle"],
    npcs: ["Fu", "Kung", "Sencha"],
    marketItems: ["pokeball", "potion"],
    routes: ["waterfalls", "ice scream", "northmandic", "chatot castle"],
    img: monastryImg,
    rounds: [
      {
        id: 0,
        pokemons: [5],
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
    completePokemonList: [],
  },
  {
    id: 14,
    name: "northmandic",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "Market", "Poke Centrum", "NPC", "Battle"],
    npcs: ["Sheriff", "Samuel", "Wee"],
    marketItems: ["pokeball", "potion"],
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
    completePokemonList: [],
  },
  {
    id: 15,
    name: "teleport",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "Market", "Poke Centrum", "NPC", "Battle"],
    npcs: ["Sheriff", "Samuel", "Wee"],
    marketItems: ["pokeball", "potion"],
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
    completePokemonList: [],
  },
  {
    id: 16,
    name: "chatot castle",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "Market", "Poke Centrum", "NPC", "Battle"],
    npcs: ["Sheriff", "Samuel", "Wee"],
    marketItems: ["pokeball", "potion"],
    routes: ["northmandic", "lovely", "monastry", "jungle", "swamp"],
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
    completePokemonList: [],
  },
  {
    id: 17,
    name: "jungle",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "NPC", "Battle"],
    npcs: ["Sheriff", "Samuel", "Wee"],
    marketItems: ["pokeball", "potion"],
    routes: ["macho pichu", "chatot castle", "safari"],
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
    completePokemonList: [],
  },
  {
    id: 18,
    name: "macho pichu",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "Market", "Poke Centrum", "NPC", "Battle"],
    npcs: ["Sheriff", "Samuel", "Wee"],
    marketItems: ["pokeball", "potion"],
    routes: ["redwoods", "jungle", "safari", "swamp"],
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
    completePokemonList: [],
  },
  {
    id: 19,
    name: "redwoods",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "NPC", "Battle"],
    npcs: ["Sheriff", "Samuel", "Wee"],
    marketItems: ["pokeball", "potion"],
    routes: ["macho pichu", "yummy desert", "safari", "swamp"],
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
    completePokemonList: [],
  },
  {
    id: 20,
    name: "yummy desert",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "NPC", "Battle"],
    npcs: ["Sheriff", "Samuel", "Wee"],
    marketItems: ["pokeball", "potion"],
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
    completePokemonList: [],
  },
  {
    id: 21,
    name: "safari",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "Market", "NPC", "Battle"],
    npcs: ["Sheriff", "Samuel", "Wee"],
    marketItems: ["pokeball", "potion"],
    routes: ["macho pichu", "jungle", "redwood"],
    img: safariImg,
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
    completePokemonList: [],
  },
  {
    id: 22,
    name: "swamp",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "NPC", "Battle"],
    npcs: ["Sheriff", "Samuel", "Wee"],
    marketItems: ["pokeball", "potion"],
    routes: ["redwoods", "macho pichu", "castle", "lovely", "bridge"],
    img: swampImg,
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
    completePokemonList: [],
  },
  {
    id: 23,
    name: "futurome",
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, eum.
        Facilis repudiandae corporis ad rem doloribus cumque, praesentium
        aliquid provident minima quis odio! Voluptates exercitationem sequi illo
        repellendus? Est, fuga.`,
    options: ["Routes", "Market", "Poke Centrum", "NPC", "Battle"],
    npcs: ["Sheriff", "Samuel", "Wee"],
    marketItems: ["pokeball", "potion"],
    routes: ["waterfalls", "willy's barn", "lake"],
    img: futuromeImg,
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
    completePokemonList: [],
  },
];
