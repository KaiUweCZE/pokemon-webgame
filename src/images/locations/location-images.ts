import { type LocationName } from "@/types/location";
import barnImg from "./barn.webp";
import bridgeImg from "./bridge.webp";
import caveImg from "./cave.webp";
import castleImg from "./chatotcastle.webp";
import crossroadImg from "./crossroad.webp";
import crossroad2Img from "./crossroad2.webp";
import mineImg from "./deepmine.webp";
import futuromeImg from "./futurome.webp";
import gastlyTowerImg from "./gastlytower.webp";
import mountainImg from "./mountain.webp";
import icescreamImg from "./icescream.webp";
import jungleImg from "./jungle.webp";
import lakeImg from "./lake.webp";
import farmImg from "./farm.webp";
import lovelyImg from "./lovely.webp";
import machoPichuImg from "./macho-pichu.webp";
import magicalForestImg from "./magical-forest.webp";
import monastryImg from "./monastry.webp";
import northmandicImg from "./northmandic.webp";
import redwoodImg from "./redwoods.webp";
import safariImg from "./safari.webp";
import shireImg from "./shire.webp";
import southamImg from "./southam.webp";
import swampImg from "./swamp.webp";
import teleportImg from "./teleport.webp";
import waterfallImg from "./waterfalls.webp";
import yummyImg from "./yummy.webp";
import { StaticImageData } from "next/image";

export const locationImages = {
  barn: {
    name: "Barn",
    img: barnImg,
    alt: "Barn location image",
  },
  bridge: {
    name: "Bridge",
    img: bridgeImg,
    alt: "Bridge location image",
  },
  cave: {
    name: "Cave",
    img: caveImg,
    alt: "Cave location image",
  },
  castle: {
    name: "Castle",
    img: castleImg,
    alt: "Castle location image",
  },
  crossroad: {
    name: "Crossroad",
    img: crossroadImg,
    alt: "Crossroad location image",
  },
  farm: {
    name: "Farm",
    img: farmImg,
    alt: "Farm location image",
  },
  futurome: {
    name: "Futurome",
    img: futuromeImg,
    alt: "Futurome location image",
  },
  gastlyTower: {
    name: "Gastly Tower",
    img: gastlyTowerImg,
    alt: "Gastly Tower location image",
  },
  icescream: {
    name: "Ice Cream Shop",
    img: icescreamImg,
    alt: "Ice Cream Shop location image",
  },
  jungle: {
    name: "Jungle",
    img: jungleImg,
    alt: "Jungle location image",
  },
  lake: {
    name: "Lake",
    img: lakeImg,
    alt: "Lake location image",
  },
  lovely: {
    name: "Lovely",
    img: lovelyImg,
    alt: "Lovely location image",
  },
  machoPichu: {
    name: "Macho Pichu",
    img: machoPichuImg,
    alt: "Macho Pichu location image",
  },
  magicalForest: {
    name: "Magical Forest",
    img: magicalForestImg,
    alt: "Magical Forest location image",
  },
  mine: {
    name: "Mine",
    img: mineImg,
    alt: "Mine location image",
  },
  monastery: {
    name: "Monastery",
    img: monastryImg,
    alt: "Monastry location image",
  },
  mountain: {
    name: "Mountain",
    img: mountainImg,
    alt: "Mountain location image",
  },
  northmandic: {
    name: "Northmandic",
    img: northmandicImg,
    alt: "Northmandic location image",
  },
  redwood: {
    name: "Redwood",
    img: redwoodImg,
    alt: "Redwood location image",
  },
  safari: {
    name: "Safari",
    img: safariImg,
    alt: "Safari location image",
  },
  southam: {
    name: "Southam",
    img: southamImg,
    alt: "Southam location image",
  },
  shire: {
    name: "Shire",
    img: shireImg,
    alt: "Shire location image",
  },
  swamp: {
    name: "Swamp",
    img: swampImg,
    alt: "Swamp location image",
  },
  teleport: {
    name: "Teleport",
    img: teleportImg,
    alt: "Teleport location image",
  },
  waterfall: {
    name: "Waterfall",
    img: waterfallImg,
    alt: "Waterfall location image",
  },
  yummy: {
    name: "Yummy",
    img: yummyImg,
    alt: "Yummy location image",
  },
} satisfies Record<LocationName, { name: string; img: StaticImageData; alt: string }>;
