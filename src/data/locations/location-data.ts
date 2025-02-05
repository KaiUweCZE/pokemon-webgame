import { LocationName } from "@/types/location";
import { StaticImageData } from "next/image";

export interface LocationData {
  name: string;
  neighborhood: LocationName[];
}

export const locationData = {
  shire: {
    name: "Shire",
    neighborhood: ["cave", "mountain", "farm"],
  },
  farm: {
    name: "Large Farm",
    neighborhood: ["shire", "bridge", "mountain"],
  },
  mountain: {
    name: "Mountains",
    neighborhood: ["farm", "cave", "bridge", "southam"],
  },
  cave: {
    name: "Cave",
    neighborhood: ["mountain", "farm", "southam"],
  },
  bridge: {
    name: "Bridge",
    neighborhood: ["mountain", "farm", "lovely", "swamp"],
  },
  lovely: {
    name: "Lovely",
    neighborhood: ["bridge", "barn", "swamp"],
  },
  barn: {
    name: "Willy's Barn",
    neighborhood: ["lake", "mine", "futurome", "waterfall", "lovely"],
  },
  lake: {
    name: "Lake",
    neighborhood: ["barn", "mine", "gastlyTower", "futurome"],
  },
  mine: {
    name: "Deep Mine",
    neighborhood: ["lake", "gastlyTower"],
  },
  gastlyTower: {
    name: "Gastly Tower",
    neighborhood: ["lake", "mine", "magicalForest"],
  },
  magicalForest: {
    name: "Magical Forest",
    neighborhood: ["icescream", "gastlyTower"],
  },
  icescream: {
    name: "Ice Scream",
    neighborhood: ["gastlyTower", "monastery", "waterfall"],
  },
  waterfall: {
    name: "Waterfall",
    neighborhood: ["icescream", "monastery", "barn"],
  },
  monastery: {
    name: "Monastery",
    neighborhood: ["waterfall", "icescream", "northmandic", "castle"],
  },
  northmandic: {
    name: "Northmandic",
    neighborhood: ["teleport", "monastery", "castle"],
  },
  teleport: {
    name: "Teleport",
    neighborhood: ["northmandic", "castle"],
  },
  castle: {
    name: "Chatot Castle",
    neighborhood: ["northmandic", "lovely", "monastery", "jungle", "swamp"],
  },
  jungle: {
    name: "Jungle",
    neighborhood: ["machoPichu", "castle", "safari"],
  },
  machoPichu: {
    name: "Macho Pichu",
    neighborhood: ["redwood", "jungle", "safari", "swamp"],
  },
  redwood: {
    name: "Redwoods",
    neighborhood: ["machoPichu", "yummy", "safari", "swamp"],
  },
  yummy: {
    name: "Yummy Desert",
    neighborhood: ["redwood"],
  },
  safari: {
    name: "Safari",
    neighborhood: ["machoPichu", "jungle", "redwood"],
  },
  swamp: {
    name: "Swamp",
    neighborhood: ["redwood", "machoPichu", "castle", "lovely", "bridge"],
  },
  futurome: {
    name: "Futurome",
    neighborhood: ["waterfall", "barn", "lake"],
  },
  southam: {
    name: "Southam",
    neighborhood: ["cave", "mountain"],
  },
} satisfies Record<LocationName, LocationData>;
