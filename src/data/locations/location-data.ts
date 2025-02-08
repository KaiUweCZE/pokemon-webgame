import { LocationName } from "@/types/location";
import { PokemonName } from "@/types/pokemon";
import { locationPokemons } from "./location-pokemon";
import { type LocationAreas, locationAreas } from "./location-areas";

interface PokemonSpawn {
  name: PokemonName;
  levelRange: {
    min: number;
    max: number;
  };
}

interface AreaSpawns {
  pokemons: PokemonSpawn[];
}

export interface LocationData {
  name: string;
  neighborhood: LocationName[];
  description: string;
  availablePokemons: PokemonName[];
  areas: LocationAreas;
  //areas: Record<number, AreaSpawns>;
}

export const locationData = {
  shire: {
    name: "Shire",
    neighborhood: ["cave", "mountain", "farm"],
    description: `The Shire is a place of wonder and adventure. It is a land of hope
    , a place of hope and a place of hope. The Shire is a place of hope,
     a place of hope and a place of hope.`,
    availablePokemons: locationPokemons["shire"],
    areas: locationAreas["shire"],
  },
  farm: {
    name: "Large Farm",
    neighborhood: ["shire", "bridge", "mountain"],
    description: `This Farm is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["farm"],
    areas: locationAreas["shire"],
  },
  mountain: {
    name: "Mountains",
    neighborhood: ["farm", "cave", "bridge", "southam"],
    description: `The Mountains are a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["mountain"],
    areas: locationAreas["shire"],
  },
  cave: {
    name: "Cave",
    neighborhood: ["mountain", "farm", "southam"],
    description: `The Cave is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["cave"],
    areas: locationAreas["shire"],
  },
  bridge: {
    name: "Bridge",
    neighborhood: ["mountain", "farm", "lovely", "swamp"],
    description: `The Bridge is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["bridge"],
    areas: locationAreas["shire"],
  },
  lovely: {
    name: "Lovely",
    neighborhood: ["bridge", "barn", "swamp"],
    description: `The Lovely is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["lovely"],
    areas: locationAreas["shire"],
  },
  barn: {
    name: "Willy's Barn",
    neighborhood: ["lake", "mine", "futurome", "waterfall", "lovely"],
    description: `The Barn is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["barn"],
    areas: locationAreas["shire"],
  },
  lake: {
    name: "Lake",
    neighborhood: ["barn", "mine", "gastlyTower", "futurome"],
    description: `The Lake is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["lake"],
    areas: locationAreas["shire"],
  },
  mine: {
    name: "Deep Mine",
    neighborhood: ["lake", "gastlyTower"],
    description: `The Mine is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["mine"],
    areas: locationAreas["shire"],
  },
  gastlyTower: {
    name: "Gastly Tower",
    neighborhood: ["lake", "mine", "magicalForest"],
    description: `The Gastly Tower is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["gastlyTower"],
    areas: locationAreas["shire"],
  },
  magicalForest: {
    name: "Magical Forest",
    neighborhood: ["icescream", "gastlyTower"],
    description: `The Magical Forest is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["magicalForest"],
    areas: locationAreas["shire"],
  },
  icescream: {
    name: "Ice Scream",
    neighborhood: ["gastlyTower", "monastery", "waterfall"],
    description: `The Ice Scream is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["icescream"],
    areas: locationAreas["shire"],
  },
  waterfall: {
    name: "Waterfall",
    neighborhood: ["icescream", "monastery", "barn"],
    description: `The Waterfall is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["waterfall"],
    areas: locationAreas["shire"],
  },
  monastery: {
    name: "Monastery",
    neighborhood: ["waterfall", "icescream", "northmandic", "castle"],
    description: `The Monastery is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["monastery"],
    areas: locationAreas["shire"],
  },
  northmandic: {
    name: "Northmandic",
    neighborhood: ["teleport", "monastery", "castle"],
    description: `The Northmandic is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["northmandic"],
    areas: locationAreas["shire"],
  },
  teleport: {
    name: "Teleport",
    neighborhood: ["northmandic", "castle"],
    description: `The Teleport is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["teleport"],
    areas: locationAreas["shire"],
  },
  castle: {
    name: "Chatot Castle",
    neighborhood: ["northmandic", "lovely", "monastery", "jungle", "swamp"],
    description: `The Chatot Castle is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["castle"],
    areas: locationAreas["shire"],
  },
  jungle: {
    name: "Jungle",
    neighborhood: ["machoPichu", "castle", "safari"],
    description: `The Jungle is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["jungle"],
    areas: locationAreas["shire"],
  },
  machoPichu: {
    name: "Macho Pichu",
    neighborhood: ["redwood", "jungle", "safari", "swamp"],
    description: `The Macho Pichu is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["machoPichu"],
    areas: locationAreas["shire"],
  },
  redwood: {
    name: "Redwoods",
    neighborhood: ["machoPichu", "yummy", "safari", "swamp"],
    description: `The Redwoods is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["redwood"],
    areas: locationAreas["shire"],
  },
  yummy: {
    name: "Yummy Desert",
    neighborhood: ["redwood"],
    description: `The Yummy Desert is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["yummy"],
    areas: locationAreas["shire"],
  },
  safari: {
    name: "Safari",
    neighborhood: ["machoPichu", "jungle", "redwood"],
    description: `The Safari is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["safari"],
    areas: locationAreas["shire"],
  },
  swamp: {
    name: "Swamp",
    neighborhood: ["redwood", "machoPichu", "castle", "lovely", "bridge"],
    description: `The Swamp is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["swamp"],
    areas: locationAreas["shire"],
  },
  futurome: {
    name: "Futurome",
    neighborhood: ["waterfall", "barn", "lake"],
    description: `The Futurome is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["futurome"],
    areas: locationAreas["shire"],
  },
  southam: {
    name: "Southam",
    neighborhood: ["cave", "mountain"],
    description: `The Southam is a place of wonder and adventure. It is a land of hope`,
    availablePokemons: locationPokemons["southam"],
    areas: locationAreas["shire"],
  },
} satisfies Record<LocationName, LocationData>;
