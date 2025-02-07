import { LocationName } from "@/types/location";
import { StaticImageData } from "next/image";

export interface LocationData {
  name: string;
  neighborhood: LocationName[];
  description: string;
}

export const locationData = {
  shire: {
    name: "Shire",
    neighborhood: ["cave", "mountain", "farm"],
    description: `The Shire is a place of wonder and adventure. It is a land of hope
    , a place of hope and a place of hope. The Shire is a place of hope,
     a place of hope and a place of hope.`,
  },
  farm: {
    name: "Large Farm",
    neighborhood: ["shire", "bridge", "mountain"],
    description: `This Farm is a place of wonder and adventure. It is a land of hope`,
  },
  mountain: {
    name: "Mountains",
    neighborhood: ["farm", "cave", "bridge", "southam"],
    description: `The Mountains are a place of wonder and adventure. It is a land of hope`,
  },
  cave: {
    name: "Cave",
    neighborhood: ["mountain", "farm", "southam"],
    description: `The Cave is a place of wonder and adventure. It is a land of hope`,
  },
  bridge: {
    name: "Bridge",
    neighborhood: ["mountain", "farm", "lovely", "swamp"],
    description: `The Bridge is a place of wonder and adventure. It is a land of hope`,
  },
  lovely: {
    name: "Lovely",
    neighborhood: ["bridge", "barn", "swamp"],
    description: `The Lovely is a place of wonder and adventure. It is a land of hope`,
  },
  barn: {
    name: "Willy's Barn",
    neighborhood: ["lake", "mine", "futurome", "waterfall", "lovely"],
    description: `The Barn is a place of wonder and adventure. It is a land of hope`,
  },
  lake: {
    name: "Lake",
    neighborhood: ["barn", "mine", "gastlyTower", "futurome"],
    description: `The Lake is a place of wonder and adventure. It is a land of hope`,
  },
  mine: {
    name: "Deep Mine",
    neighborhood: ["lake", "gastlyTower"],
    description: `The Mine is a place of wonder and adventure. It is a land of hope`,
  },
  gastlyTower: {
    name: "Gastly Tower",
    neighborhood: ["lake", "mine", "magicalForest"],
    description: `The Gastly Tower is a place of wonder and adventure. It is a land of hope`,
  },
  magicalForest: {
    name: "Magical Forest",
    neighborhood: ["icescream", "gastlyTower"],
    description: `The Magical Forest is a place of wonder and adventure. It is a land of hope`,
  },
  icescream: {
    name: "Ice Scream",
    neighborhood: ["gastlyTower", "monastery", "waterfall"],
    description: `The Ice Scream is a place of wonder and adventure. It is a land of hope`,
  },
  waterfall: {
    name: "Waterfall",
    neighborhood: ["icescream", "monastery", "barn"],
    description: `The Waterfall is a place of wonder and adventure. It is a land of hope`,
  },
  monastery: {
    name: "Monastery",
    neighborhood: ["waterfall", "icescream", "northmandic", "castle"],
    description: `The Monastery is a place of wonder and adventure. It is a land of hope`,
  },
  northmandic: {
    name: "Northmandic",
    neighborhood: ["teleport", "monastery", "castle"],
    description: `The Northmandic is a place of wonder and adventure. It is a land of hope`,
  },
  teleport: {
    name: "Teleport",
    neighborhood: ["northmandic", "castle"],
    description: `The Teleport is a place of wonder and adventure. It is a land of hope`,
  },
  castle: {
    name: "Chatot Castle",
    neighborhood: ["northmandic", "lovely", "monastery", "jungle", "swamp"],
    description: `The Chatot Castle is a place of wonder and adventure. It is a land of hope`,
  },
  jungle: {
    name: "Jungle",
    neighborhood: ["machoPichu", "castle", "safari"],
    description: `The Jungle is a place of wonder and adventure. It is a land of hope`,
  },
  machoPichu: {
    name: "Macho Pichu",
    neighborhood: ["redwood", "jungle", "safari", "swamp"],
    description: `The Macho Pichu is a place of wonder and adventure. It is a land of hope`,
  },
  redwood: {
    name: "Redwoods",
    neighborhood: ["machoPichu", "yummy", "safari", "swamp"],
    description: `The Redwoods is a place of wonder and adventure. It is a land of hope`,
  },
  yummy: {
    name: "Yummy Desert",
    neighborhood: ["redwood"],
    description: `The Yummy Desert is a place of wonder and adventure. It is a land of hope`,
  },
  safari: {
    name: "Safari",
    neighborhood: ["machoPichu", "jungle", "redwood"],
    description: `The Safari is a place of wonder and adventure. It is a land of hope`,
  },
  swamp: {
    name: "Swamp",
    neighborhood: ["redwood", "machoPichu", "castle", "lovely", "bridge"],
    description: `The Swamp is a place of wonder and adventure. It is a land of hope`,
  },
  futurome: {
    name: "Futurome",
    neighborhood: ["waterfall", "barn", "lake"],
    description: `The Futurome is a place of wonder and adventure. It is a land of hope`,
  },
  southam: {
    name: "Southam",
    neighborhood: ["cave", "mountain"],
    description: `The Southam is a place of wonder and adventure. It is a land of hope`,
  },
} satisfies Record<LocationName, LocationData>;
