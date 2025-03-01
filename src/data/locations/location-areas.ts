import { LocationName } from "@/types/location";
import { PokemonName } from "@/types/pokemon";
import { type LocationPokemons } from "./location-pokemon";

type AreaNumber = 1 | 2 | 3 | 4;

type LocationPokemonSet<T extends LocationName> = LocationPokemons[T][number];

export interface AreaConfig<T extends LocationName> {
  pokemons: LocationPokemonSet<T>[];
  min: number;
  max: number;
}

export type LocationAreasType = {
  [Location in LocationName]: {
    [Area in AreaNumber]: AreaConfig<Location>;
  };
};

type UsedPokemons<T extends LocationName> = (typeof locationAreas)[T][
  | 1
  | 2
  | 3
  | 4]["pokemons"][number];

type MissingPokemons<T extends LocationName> = Exclude<
  LocationPokemons[T][number],
  UsedPokemons<T>
>;

// check all locations for missing available pokemons
type LocationsWithMissingPokemons = {
  [Location in LocationName as MissingPokemons<Location> extends never
    ? never
    : Location]: MissingPokemons<Location>;
};

export const locationAreas = {
  shire: {
    1: {
      pokemons: ["pidgey", "bulbasaur", "charmander", "squirtle"],
      min: 2,
      max: 8,
    },
    2: {
      pokemons: ["pidgey", "bulbasaur", "eevee"],
      min: 8,
      max: 15,
    },
    3: {
      pokemons: ["pidgey", "squirtle", "charmander"],
      min: 15,
      max: 22,
    },
    4: {
      pokemons: ["pidgey", "eevee"],
      min: 22,
      max: 30,
    },
  },
  cave: {
    1: {
      pokemons: ["zubat", "geodude", "sandshrew"],
      min: 5,
      max: 12,
    },
    2: {
      pokemons: ["zubat", "geodude", "cubone"],
      min: 12,
      max: 20,
    },
    3: {
      pokemons: ["zubat", "geodude", "duskull"],
      min: 20,
      max: 28,
    },
    4: {
      pokemons: ["zubat", "sandshrew", "cubone"],
      min: 28,
      max: 35,
    },
  },
  farm: {
    1: {
      pokemons: ["growlithe", "tauros", "vulpix", "machop"],
      min: 4,
      max: 10,
    },
    2: {
      pokemons: ["growlithe", "vulpix", "machop", "snubbull"],
      min: 10,
      max: 18,
    },
    3: {
      pokemons: ["growlithe", "tauros", "snubbull", "machop"],
      min: 18,
      max: 25,
    },
    4: {
      pokemons: ["tauros", "vulpix", "snubbull"],
      min: 25,
      max: 32,
    },
  },

  mountain: {
    1: {
      pokemons: ["geodude", "rhyhorn", "onix", "larvitar"],
      min: 8,
      max: 15,
    },
    2: {
      pokemons: ["geodude", "rhyhorn", "onix", "beldum"],
      min: 15,
      max: 22,
    },
    3: {
      pokemons: ["rhyhorn", "onix", "larvitar", "beldum"],
      min: 22,
      max: 30,
    },
    4: {
      pokemons: ["onix", "larvitar", "beldum"],
      min: 30,
      max: 38,
    },
  },

  bridge: {
    1: {
      pokemons: ["pidgey", "hoothoot", "blitzle", "joltik"],
      min: 10,
      max: 18,
    },
    2: {
      pokemons: ["hoothoot", "blitzle", "joltik", "grubbin"],
      min: 18,
      max: 25,
    },
    3: {
      pokemons: ["blitzle", "joltik", "grubbin"],
      min: 25,
      max: 32,
    },
    4: {
      pokemons: ["blitzle", "grubbin", "joltik"],
      min: 32,
      max: 40,
    },
  },

  lovely: {
    1: {
      pokemons: ["eevee", "togepi", "snubbull", "ralts"],
      min: 12,
      max: 20,
    },
    2: {
      pokemons: ["eevee", "togepi", "snubbull", "granbull"],
      min: 20,
      max: 28,
    },
    3: {
      pokemons: ["eevee", "togetic", "granbull", "ralts"],
      min: 28,
      max: 35,
    },
    4: {
      pokemons: ["togetic", "granbull", "ralts"],
      min: 35,
      max: 42,
    },
  },

  gastlyTower: {
    1: {
      pokemons: ["gastly", "duskull", "honedge", "murkrow"],
      min: 15,
      max: 22,
    },
    2: {
      pokemons: ["gastly", "duskull", "honedge", "murkrow"],
      min: 22,
      max: 30,
    },
    3: {
      pokemons: ["haunter", "duskull", "honedge", "murkrow"],
      min: 30,
      max: 38,
    },
    4: {
      pokemons: ["haunter", "dusclops", "doublade", "honchkrow"],
      min: 38,
      max: 45,
    },
  },

  waterfall: {
    1: {
      pokemons: ["magikarp", "horsea", "froakie", "wartortle"],
      min: 20,
      max: 28,
    },
    2: {
      pokemons: ["gyarados", "horsea", "froakie", "wartortle"],
      min: 28,
      max: 35,
    },
    3: {
      pokemons: ["gyarados", "seadra", "frogadier", "wartortle"],
      min: 35,
      max: 42,
    },
    4: {
      pokemons: ["gyarados", "kingdra", "greninja", "blastoise"],
      min: 42,
      max: 50,
    },
  },
  barn: {
    1: {
      pokemons: ["tauros", "growlithe", "vulpix", "farfetchd"],
      min: 15,
      max: 22,
    },
    2: {
      pokemons: ["tauros", "growlithe", "farfetchd", "granbull"],
      min: 22,
      max: 30,
    },
    3: {
      pokemons: ["tauros", "vulpix", "granbull"],
      min: 30,
      max: 38,
    },
    4: {
      pokemons: ["tauros", "farfetchd", "granbull"],
      min: 38,
      max: 45,
    },
  },

  lake: {
    1: {
      pokemons: ["magikarp", "horsea", "squirtle", "froakie"],
      min: 18,
      max: 25,
    },
    2: {
      pokemons: ["magikarp", "horsea", "squirtle", "blitzle"],
      min: 25,
      max: 32,
    },
    3: {
      pokemons: ["seadra", "wartortle", "blitzle"],
      min: 32,
      max: 40,
    },
    4: {
      pokemons: ["seadra", "wartortle", "zebstrika"],
      min: 40,
      max: 48,
    },
  },
  mine: {
    1: {
      pokemons: ["geodude", "onix", "rhyhorn", "beldum"],
      min: 20,
      max: 28,
    },
    2: {
      pokemons: ["graveler", "onix", "rhyhorn", "tinkatink"],
      min: 28,
      max: 35,
    },
    3: {
      pokemons: ["graveler", "onix", "rhydon", "tinkatuff"],
      min: 35,
      max: 42,
    },
    4: {
      pokemons: ["golem", "onix", "sandslash"],
      min: 42,
      max: 50,
    },
  },

  magicalForest: {
    1: {
      pokemons: ["ralts", "seedot", "rowlet", "nuzleaf"],
      min: 25,
      max: 32,
    },
    2: {
      pokemons: ["kirlia", "nuzleaf", "rowlet", "dartrix"],
      min: 32,
      max: 40,
    },
    3: {
      pokemons: ["kirlia", "shiftry", "dartrix", "decidueye"],
      min: 40,
      max: 47,
    },
    4: {
      pokemons: ["gallade", "shiftry", "decidueye"],
      min: 47,
      max: 55,
    },
  },

  icescream: {
    1: {
      pokemons: ["snover", "cubchoo", "swinub", "sneasel"],
      min: 28,
      max: 35,
    },
    2: {
      pokemons: ["snover", "beartic", "swinub", "sneasel"],
      min: 35,
      max: 42,
    },
    3: {
      pokemons: ["abomasnow", "beartic", "piloswine", "weavile"],
      min: 42,
      max: 50,
    },
    4: {
      pokemons: ["abomasnow", "beartic", "mamoswine", "weavile"],
      min: 50,
      max: 58,
    },
  },

  monastery: {
    1: {
      pokemons: ["machop", "mankey", "hitmonlee", "chimchar"],
      min: 30,
      max: 38,
    },
    2: {
      pokemons: ["machoke", "primeape", "hitmonchan", "monferno"],
      min: 38,
      max: 45,
    },
    3: {
      pokemons: ["machoke", "primeape", "hitmonlee", "infernape"],
      min: 45,
      max: 52,
    },
    4: {
      pokemons: ["machamp", "annihilape", "hitmonchan", "infernape"],
      min: 52,
      max: 60,
    },
  },
  castle: {
    1: {
      pokemons: ["honedge", "pawniard", "bisharp", "horsea"],
      min: 35,
      max: 42,
    },
    2: {
      pokemons: ["honedge", "pawniard", "bisharp", "seadra"],
      min: 42,
      max: 48,
    },
    3: {
      pokemons: ["doublade", "bisharp", "aegislash", "seadra"],
      min: 48,
      max: 55,
    },
    4: {
      pokemons: ["aegislash", "bisharp", "kingdra"],
      min: 55,
      max: 62,
    },
  },

  futurome: {
    1: {
      pokemons: ["beldum", "charjabug", "metang", "vikavolt"],
      min: 30,
      max: 38,
    },
    2: {
      pokemons: ["beldum", "charjabug", "metang", "vikavolt"],
      min: 38,
      max: 45,
    },
    3: {
      pokemons: ["metang", "vikavolt", "metagross"],
      min: 45,
      max: 52,
    },
    4: {
      pokemons: ["metagross", "vikavolt"],
      min: 52,
      max: 60,
    },
  },

  jungle: {
    1: {
      pokemons: ["mankey", "heracross", "pinsir", "scyther"],
      min: 32,
      max: 40,
    },
    2: {
      pokemons: ["primeape", "heracross", "pinsir", "scyther"],
      min: 40,
      max: 48,
    },
    3: {
      pokemons: ["primeape", "heracross", "pinsir", "scizor"],
      min: 48,
      max: 55,
    },
    4: {
      pokemons: ["annihilape", "heracross", "scizor"],
      min: 55,
      max: 62,
    },
  },

  machoPichu: {
    1: {
      pokemons: ["machop", "machoke", "primeape", "mankey"],
      min: 35,
      max: 42,
    },
    2: {
      pokemons: ["machoke", "primeape", "annihilape"],
      min: 42,
      max: 50,
    },
    3: {
      pokemons: ["machoke", "annihilape", "machamp"],
      min: 50,
      max: 58,
    },
    4: {
      pokemons: ["machamp", "annihilape"],
      min: 58,
      max: 65,
    },
  },

  northmandic: {
    1: {
      pokemons: ["sneasel", "snover", "cubchoo", "swinub"],
      min: 40,
      max: 48,
    },
    2: {
      pokemons: ["weavile", "abomasnow", "beartic", "piloswine"],
      min: 48,
      max: 55,
    },
    3: {
      pokemons: ["weavile", "abomasnow", "beartic", "mamoswine"],
      min: 55,
      max: 62,
    },
    4: {
      pokemons: ["weavile", "abomasnow", "mamoswine"],
      min: 62,
      max: 70,
    },
  },

  redwood: {
    1: {
      pokemons: ["scyther", "heracross", "turtwig", "pinsir"],
      min: 38,
      max: 45,
    },
    2: {
      pokemons: ["scyther", "heracross", "grotle", "pinsir"],
      min: 45,
      max: 52,
    },
    3: {
      pokemons: ["scizor", "heracross", "grotle", "torterra"],
      min: 52,
      max: 60,
    },
    4: {
      pokemons: ["scizor", "heracross", "torterra"],
      min: 60,
      max: 68,
    },
  },

  safari: {
    1: {
      pokemons: ["tauros", "kangaskhan", "rhyhorn", "pinsir"],
      min: 35,
      max: 42,
    },
    2: {
      pokemons: ["tauros", "kangaskhan", "rhydon", "heracross"],
      min: 42,
      max: 50,
    },
    3: {
      pokemons: ["tauros", "kangaskhan", "rhydon", "heracross"],
      min: 50,
      max: 58,
    },
    4: {
      pokemons: ["tauros", "kangaskhan", "rhyperior"],
      min: 58,
      max: 65,
    },
  },

  southam: {
    1: {
      pokemons: ["machop", "geodude", "onix", "rhyhorn"],
      min: 12,
      max: 20,
    },
    2: {
      pokemons: ["machoke", "graveler", "onix", "rhyhorn"],
      min: 20,
      max: 28,
    },
    3: {
      pokemons: ["machoke", "graveler", "onix", "rhydon"],
      min: 28,
      max: 35,
    },
    4: {
      pokemons: ["machamp", "golem", "onix", "rhydon"],
      min: 35,
      max: 42,
    },
  },

  swamp: {
    1: {
      pokemons: ["bulbasaur", "froakie", "ivysaur", "frogadier"],
      min: 25,
      max: 32,
    },
    2: {
      pokemons: ["ivysaur", "frogadier", "venusaur", "greninja"],
      min: 32,
      max: 40,
    },
    3: {
      pokemons: ["venusaur", "frogadier", "greninja"],
      min: 40,
      max: 48,
    },
    4: {
      pokemons: ["venusaur", "greninja"],
      min: 48,
      max: 55,
    },
  },

  teleport: {
    1: {
      pokemons: ["abra", "ralts", "kirlia"],
      min: 42,
      max: 50,
    },
    2: {
      pokemons: ["kadabra", "kirlia", "gallade", "abra"],
      min: 50,
      max: 58,
    },
    3: {
      pokemons: ["kadabra", "gallade"],
      min: 58,
      max: 65,
    },
    4: {
      pokemons: ["alakazam", "gallade"],
      min: 65,
      max: 72,
    },
  },

  yummy: {
    1: {
      pokemons: ["sandshrew", "sandslash", "torkoal", "rhyhorn"],
      min: 45,
      max: 52,
    },
    2: {
      pokemons: ["sandslash", "torkoal", "rhydon", "rhyhorn"],
      min: 52,
      max: 60,
    },
    3: {
      pokemons: ["sandslash", "torkoal", "rhydon"],
      min: 60,
      max: 68,
    },
    4: {
      pokemons: ["sandslash", "torkoal", "rhyperior"],
      min: 68,
      max: 75,
    },
  },
} satisfies LocationAreasType;

export type AreaType = {
  pokemons: PokemonName[];
  min: number;
  max: number;
};

export type LocationAreas = {
  1: AreaType;
  2: AreaType;
  3: AreaType;
  4: AreaType;
};

//export type AreasType = typeof locationAreas;

// Helper funkce pro získání pokémonů pro konkrétní oblast
export const getAreaPokemons = (location: LocationName, area: AreaNumber): PokemonName[] => {
  return locationAreas[location][area].pokemons;
};
