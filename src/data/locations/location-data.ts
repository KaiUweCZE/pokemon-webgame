import { LocationName } from "@/types/location";
import { PokemonName } from "@/types/pokemon";
import { locationPokemons } from "./location-pokemon";
import { type LocationAreas, locationAreas } from "./location-areas";
import { ItemName } from "@/types/item";

interface PokemonSpawn {
  name: PokemonName;
  levelRange: {
    min: number;
    max: number;
  };
}

type ShopItems = ItemName[];

type LocationActions = "explore" | "shop" | "pokecenter" | "travel" | "talk";

interface AreaSpawns {
  pokemons: PokemonSpawn[];
}

export interface LocationData {
  name: string;
  neighborhood: LocationName[];
  description: string;
  availablePokemons: PokemonName[];
  areas: LocationAreas;
  locationActions: LocationActions[];
  shopItems?: ShopItems;
  //areas: Record<number, AreaSpawns>;
}

const basicActions = ["explore", "travel", "talk"] as LocationActions[];

const townActions = ["shop", "pokecenter"] as LocationActions[];

const basicItemList = ["pokeball", "antidote", "coffee", "potion"] as ItemName[];

export const locationData = {
  shire: {
    name: "Shire",
    neighborhood: ["cave", "mountain", "farm"],
    description: `The Shire is a place of wonder and adventure. It is a land of hope
    , a place of hope and a place of hope. The Shire is a place of hope,
     a place of hope and a place of hope.`,
    availablePokemons: locationPokemons["shire"],
    areas: locationAreas["shire"],
    locationActions: basicActions.concat(townActions),
    shopItems: basicItemList,
  },
  farm: {
    name: "Large Farm",
    neighborhood: ["shire", "bridge", "mountain"],
    description: `This Farm is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["farm"],
    areas: locationAreas["farm"],
    locationActions: basicActions,
  },
  mountain: {
    name: "Mountains",
    neighborhood: ["farm", "cave", "bridge", "southam"],
    description: `The Mountains are a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["mountain"],
    areas: locationAreas["mountain"],
    locationActions: basicActions,
  },
  cave: {
    name: "Cave",
    neighborhood: ["mountain", "farm", "southam"],
    description: `The Cave is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["cave"],
    areas: locationAreas["cave"],
    locationActions: basicActions,
  },
  bridge: {
    name: "Bridge",
    neighborhood: ["mountain", "farm", "lovely", "swamp"],
    description: `The Bridge is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["bridge"],
    areas: locationAreas["bridge"],
    locationActions: basicActions,
  },
  lovely: {
    name: "Lovely",
    neighborhood: ["bridge", "barn", "swamp"],
    description: `The Lovely is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["lovely"],
    areas: locationAreas["lovely"],
    locationActions: basicActions.concat(townActions),
    shopItems: basicItemList,
  },
  barn: {
    name: "Willy's Barn",
    neighborhood: ["lake", "mine", "futurome", "waterfall", "lovely"],
    description: `The Barn is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["barn"],
    areas: locationAreas["barn"],
    locationActions: basicActions,
  },
  lake: {
    name: "Lake",
    neighborhood: ["barn", "mine", "gastlyTower", "futurome"],
    description: `The Lake is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["lake"],
    areas: locationAreas["lake"],
    locationActions: basicActions,
  },
  mine: {
    name: "Deep Mine",
    neighborhood: ["lake", "gastlyTower"],
    description: `The Mine is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["mine"],
    areas: locationAreas["mine"],
    locationActions: basicActions,
  },
  gastlyTower: {
    name: "Gastly Tower",
    neighborhood: ["lake", "mine", "magicalForest"],
    description: `The Gastly Tower is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["gastlyTower"],
    areas: locationAreas["gastlyTower"],
    locationActions: basicActions,
  },
  magicalForest: {
    name: "Magical Forest",
    neighborhood: ["icescream", "gastlyTower"],
    description: `The Magical Forest is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["magicalForest"],
    areas: locationAreas["magicalForest"],
    locationActions: basicActions,
  },
  icescream: {
    name: "Ice Scream",
    neighborhood: ["gastlyTower", "monastery", "waterfall"],
    description: `The Ice Scream is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["icescream"],
    areas: locationAreas["icescream"],
    locationActions: basicActions.concat(townActions),
    shopItems: basicItemList,
  },
  waterfall: {
    name: "Waterfall",
    neighborhood: ["icescream", "monastery", "barn"],
    description: `The Waterfall is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["waterfall"],
    areas: locationAreas["waterfall"],
    locationActions: basicActions,
  },
  monastery: {
    name: "Monastery",
    neighborhood: ["waterfall", "icescream", "northmandic", "castle"],
    description: `The Monastery is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["monastery"],
    areas: locationAreas["monastery"],
    locationActions: basicActions.concat(townActions),
    shopItems: basicItemList,
  },
  northmandic: {
    name: "Northmandic",
    neighborhood: ["teleport", "monastery", "castle"],
    description: `The Northmandic is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["northmandic"],
    areas: locationAreas["northmandic"],
    locationActions: basicActions.concat(townActions),
    shopItems: basicItemList,
  },
  teleport: {
    name: "Teleport",
    neighborhood: ["northmandic", "castle"],
    description: `The Teleport is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["teleport"],
    areas: locationAreas["teleport"],
    locationActions: basicActions.concat(townActions),
    shopItems: basicItemList,
  },
  castle: {
    name: "Chatot Castle",
    neighborhood: ["northmandic", "lovely", "monastery", "jungle", "swamp"],
    description: `The Chatot Castle is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["castle"],
    areas: locationAreas["castle"],
    locationActions: basicActions.concat(townActions),
    shopItems: basicItemList,
  },
  jungle: {
    name: "Jungle",
    neighborhood: ["machoPichu", "castle", "safari"],
    description: `The Jungle is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["jungle"],
    areas: locationAreas["jungle"],
    locationActions: basicActions,
  },
  machoPichu: {
    name: "Macho Pichu",
    neighborhood: ["redwood", "jungle", "safari", "swamp"],
    description: `The Macho Pichu is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["machoPichu"],
    areas: locationAreas["machoPichu"],
    locationActions: basicActions.concat(townActions),
    shopItems: basicItemList,
  },
  redwood: {
    name: "Redwoods",
    neighborhood: ["machoPichu", "yummy", "safari", "swamp"],
    description: `The Redwoods is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["redwood"],
    areas: locationAreas["redwood"],
    locationActions: basicActions,
  },
  yummy: {
    name: "Yummy Desert",
    neighborhood: ["redwood"],
    description: `The Yummy Desert is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["yummy"],
    areas: locationAreas["yummy"],
    locationActions: basicActions.concat(townActions),
    shopItems: basicItemList,
  },
  safari: {
    name: "Safari",
    neighborhood: ["machoPichu", "jungle", "redwood"],
    description: `The Safari is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["safari"],
    areas: locationAreas["safari"],
    locationActions: basicActions.concat(townActions),
    shopItems: basicItemList,
  },
  swamp: {
    name: "Swamp",
    neighborhood: ["redwood", "machoPichu", "castle", "lovely", "bridge"],
    description: `The Swamp is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["swamp"],
    areas: locationAreas["swamp"],
    locationActions: basicActions,
  },
  futurome: {
    name: "Futurome",
    neighborhood: ["waterfall", "barn", "lake"],
    description: `The Futurome is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["futurome"],
    areas: locationAreas["futurome"],
    locationActions: basicActions.concat(townActions),
    shopItems: basicItemList,
  },
  southam: {
    name: "Southam",
    neighborhood: ["cave", "mountain"],
    description: `The Southam is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["southam"],
    areas: locationAreas["southam"],
    locationActions: basicActions.concat(townActions),
    shopItems: basicItemList,
  },
} satisfies Record<LocationName, LocationData>;
