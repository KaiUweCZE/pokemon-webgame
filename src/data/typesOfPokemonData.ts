export const typesOfPokemon = [
  {
    name: "fire",
    advantage: ["grass", "ice", "bug", "steel"],
    disadvantage: ["water", "rock", "fire", "dragon"],
  },
  {
    name: "water",
    advantage: ["fire", "ground", "rock"],
    disadvantage: ["water", "grass", "dragon"],
  },
  {
    name: "grass",
    advantage: ["water", "ground", "rock"],
    disadvantage: [
      "fire",
      "grass",
      "poison",
      "flying",
      "bug",
      "dragon",
      "steel",
    ],
  },
  {
    name: "electric",
    advantage: ["water", "flying"],
    disadvantage: ["electric", "ground", "grass", "dragon"],
  },
  {
    name: "ice",
    advantage: ["grass", "ground", "flying", "dragon"],
    disadvantage: ["fire", "water", "ice", "steel"],
  },
  {
    name: "fighting",
    advantage: ["normal", "ice", "rock", "dark", "steel"],
    disadvantage: ["flying", "poison", "psychic", "bug", "ghost", "fairy"],
  },
  {
    name: "poison",
    advantage: ["grass", "fairy"],
    disadvantage: ["poison", "ground", "rock", "ghost", "steel"],
  },
  {
    name: "ground",
    advantage: ["fire", "electric", "poison", "rock", "steel"],
    disadvantage: ["grass", "ice", "water"],
  },
  {
    name: "flying",
    advantage: ["grass", "fighting", "bug"],
    disadvantage: ["electric", "rock", "steel"],
  },
  {
    name: "psychic",
    advantage: ["fighting", "poison"],
    disadvantage: ["psychic", "dark", "steel"],
  },
  {
    name: "bug",
    advantage: ["grass", "psychic", "dark"],
    disadvantage: [
      "fire",
      "fighting",
      "poison",
      "flying",
      "ghost",
      "steel",
      "fairy",
    ],
  },
  {
    name: "rock",
    advantage: ["fire", "ice", "flying", "bug"],
    disadvantage: ["water", "grass", "fighting", "ground", "steel"],
  },
  {
    name: "ghost",
    advantage: ["psychic", "ghost"],
    disadvantage: ["dark"],
  },
  {
    name: "dragon",
    advantage: ["dragon"],
    disadvantage: ["steel", "fairy"],
  },
  {
    name: "dark",
    advantage: ["psychic", "ghost"],
    disadvantage: ["fighting", "dark", "fairy"],
  },
  {
    name: "steel",
    advantage: ["ice", "rock", "fairy"],
    disadvantage: ["fire", "water", "electric", "steel"],
  },
  {
    name: "fairy",
    advantage: ["fighting", "dragon", "dark"],
    disadvantage: ["poison", "steel", "fire"],
  },
  {
    name: "normal",
    advantage: [],
    disadvantage: ["rock", "ghost", "steel"],
  },
];
