// pokemon-attacks.ts
import { PokemonName } from "@/types/pokemon";
import type { AttackKey } from "./attacks-data";

export const POKEMON_ATTACK_LEVELS = {
  bulbasaur: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "vine whip" },
    { learnAt: 20, attack: "razor leaf" },
    { learnAt: 30, attack: "solar beam" },
  ],
  ivysaur: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "vine whip" },
    { learnAt: 20, attack: "razor leaf" },
    { learnAt: 30, attack: "solar beam" },
  ],
  venusaur: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "vine whip" },
    { learnAt: 20, attack: "razor leaf" },
    { learnAt: 30, attack: "solar beam" },
  ],
  charmander: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "ember" },
    { learnAt: 20, attack: "fire spin" },
    { learnAt: 30, attack: "flamethrower" },
  ],
  charmeleon: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "ember" },
    { learnAt: 20, attack: "fire spin" },
    { learnAt: 30, attack: "flamethrower" },
  ],
  charizard: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "ember" },
    { learnAt: 20, attack: "fire spin" },
    { learnAt: 30, attack: "flamethrower" },
    { learnAt: 40, attack: "fire blast" },
  ],
  squirtle: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "water gun" },
    { learnAt: 20, attack: "bubble beam" },
    { learnAt: 30, attack: "hydro pump" },
  ],
  wartortle: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "water gun" },
    { learnAt: 20, attack: "bubble beam" },
    { learnAt: 30, attack: "hydro pump" },
  ],
  blastoise: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "water gun" },
    { learnAt: 20, attack: "bubble beam" },
    { learnAt: 30, attack: "hydro pump" },
  ],
  pikachu: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "thunder shock" },
    { learnAt: 20, attack: "thunderbolt" },
    { learnAt: 30, attack: "thunder" },
  ],
  raichu: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "thunder shock" },
    { learnAt: 20, attack: "thunderbolt" },
    { learnAt: 30, attack: "thunder" },
  ],
  pidgey: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "gust" },
    { learnAt: 20, attack: "wing attack" },
    { learnAt: 30, attack: "brave bird" },
  ],
  pidgeotto: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "gust" },
    { learnAt: 20, attack: "wing attack" },
    { learnAt: 30, attack: "brave bird" },
  ],
  pidgeot: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "gust" },
    { learnAt: 20, attack: "wing attack" },
    { learnAt: 30, attack: "brave bird" },
  ],
  vulpix: [
    { learnAt: 0, attack: "ember" },
    { learnAt: 0, attack: "bite" },
    { learnAt: 20, attack: "fire spin" },
    { learnAt: 30, attack: "flamethrower" },
  ],
  ninetales: [
    { learnAt: 0, attack: "ember" },
    { learnAt: 0, attack: "bite" },
    { learnAt: 20, attack: "fire spin" },
    { learnAt: 30, attack: "flamethrower" },
    { learnAt: 40, attack: "fire blast" },
  ],
  geodude: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "rock throw" },
    { learnAt: 20, attack: "rock slide" },
    { learnAt: 30, attack: "stone edge" },
  ],
  graveler: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "rock throw" },
    { learnAt: 20, attack: "rock slide" },
    { learnAt: 30, attack: "stone edge" },
  ],
  golem: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "rock throw" },
    { learnAt: 20, attack: "rock slide" },
    { learnAt: 30, attack: "stone edge" },
    { learnAt: 40, attack: "earthquake" },
  ],
  cubone: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "sand attack" },
    { learnAt: 20, attack: "dig" },
    { learnAt: 30, attack: "earthquake" },
  ],
  marowak: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "sand attack" },
    { learnAt: 10, attack: "dig" },
    { learnAt: 20, attack: "earthquake" },
  ],
  sandshrew: [
    { learnAt: 0, attack: "scratch" },
    { learnAt: 0, attack: "sand attack" },
    { learnAt: 20, attack: "dig" },
    { learnAt: 30, attack: "earthquake" },
  ],
  sandslash: [
    { learnAt: 0, attack: "scratch" },
    { learnAt: 0, attack: "sand attack" },
    { learnAt: 20, attack: "dig" },
    { learnAt: 30, attack: "earthquake" },
  ],
  nidoran: [
    { learnAt: 0, attack: "scratch" },
    { learnAt: 0, attack: "poison sting" },
    { learnAt: 20, attack: "bite" },
    { learnAt: 30, attack: "toxic" },
  ],
  nidorino: [
    { learnAt: 0, attack: "scratch" },
    { learnAt: 0, attack: "poison sting" },
    { learnAt: 20, attack: "bite" },
    { learnAt: 30, attack: "toxic" },
  ],
  nidoking: [
    { learnAt: 0, attack: "scratch" },
    { learnAt: 0, attack: "poison sting" },
    { learnAt: 20, attack: "bite" },
    { learnAt: 30, attack: "toxic" },
    { learnAt: 40, attack: "earthquake" },
  ],
  abra: [
    { learnAt: 0, attack: "confusion" },
    { learnAt: 10, attack: "psybeam" },
    { learnAt: 20, attack: "psychic" },
  ],
  kadabra: [
    { learnAt: 0, attack: "confusion" },
    { learnAt: 10, attack: "psybeam" },
    { learnAt: 20, attack: "psychic" },
  ],
  alakazam: [
    { learnAt: 0, attack: "confusion" },
    { learnAt: 10, attack: "psybeam" },
    { learnAt: 20, attack: "psychic" },
  ],
  machop: [
    { learnAt: 0, attack: "karate chop" },
    { learnAt: 0, attack: "mach punch" },
    { learnAt: 20, attack: "high jump kick" },
  ],
  machoke: [
    { learnAt: 0, attack: "karate chop" },
    { learnAt: 0, attack: "mach punch" },
    { learnAt: 20, attack: "high jump kick" },
  ],
  machamp: [
    { learnAt: 0, attack: "karate chop" },
    { learnAt: 0, attack: "mach punch" },
    { learnAt: 20, attack: "high jump kick" },
  ],
  growlithe: [
    { learnAt: 0, attack: "ember" },
    { learnAt: 0, attack: "tackle" },
    { learnAt: 10, attack: "flamethrower" },
    { learnAt: 20, attack: "fire blast" },
  ],
  arcanine: [
    { learnAt: 0, attack: "ember" },
    { learnAt: 0, attack: "quick attack" },
    { learnAt: 0, attack: "flamethrower" },
    { learnAt: 10, attack: "fire blast" },
  ],
  farfetchd: [
    { learnAt: 0, attack: "gust" },
    { learnAt: 0, attack: "quick attack" },
    { learnAt: 10, attack: "wing attack" },
    { learnAt: 20, attack: "brave bird" },
  ],
  gastly: [
    { learnAt: 0, attack: "lick" },
    { learnAt: 10, attack: "shadow ball" },
    { learnAt: 20, attack: "night shade" },
  ],
  haunter: [
    { learnAt: 0, attack: "lick" },
    { learnAt: 0, attack: "shadow ball" },
    { learnAt: 10, attack: "night shade" },
  ],
  gengar: [
    { learnAt: 0, attack: "lick" },
    { learnAt: 0, attack: "shadow ball" },
    { learnAt: 0, attack: "night shade" },
  ],
  onix: [
    { learnAt: 0, attack: "rock throw" },
    { learnAt: 0, attack: "tackle" },
    { learnAt: 10, attack: "rock slide" },
    { learnAt: 20, attack: "earthquake" },
  ],
  krabby: [
    { learnAt: 0, attack: "water gun" },
    { learnAt: 0, attack: "bubble beam" },
    { learnAt: 10, attack: "hydro pump" },
  ],
  kingler: [
    { learnAt: 0, attack: "water gun" },
    { learnAt: 0, attack: "bubble beam" },
    { learnAt: 0, attack: "hydro pump" },
  ],
  hitmonlee: [
    { learnAt: 0, attack: "karate chop" },
    { learnAt: 0, attack: "mach punch" },
    { learnAt: 10, attack: "high jump kick" },
  ],
  hitmonchan: [
    { learnAt: 0, attack: "karate chop" },
    { learnAt: 0, attack: "mach punch" },
    { learnAt: 10, attack: "high jump kick" },
  ],
  koffing: [
    { learnAt: 0, attack: "poison sting" },
    { learnAt: 0, attack: "tackle" },
    { learnAt: 10, attack: "sludge bomb" },
    { learnAt: 20, attack: "toxic" },
  ],
  weezing: [
    { learnAt: 0, attack: "poison sting" },
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "sludge bomb" },
    { learnAt: 10, attack: "toxic" },
  ],
  rhyhorn: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "rock throw" },
    { learnAt: 10, attack: "earthquake" },
    { learnAt: 20, attack: "stone edge" },
  ],
  rhydon: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "rock throw" },
    { learnAt: 0, attack: "earthquake" },
    { learnAt: 10, attack: "stone edge" },
  ],
  kangaskhan: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "quick attack" },
    { learnAt: 10, attack: "slam" },
  ],
  mrmime: [
    { learnAt: 0, attack: "confusion" },
    { learnAt: 0, attack: "fairy wind" },
    { learnAt: 10, attack: "psybeam" },
    { learnAt: 20, attack: "psychic" },
  ],
  scyther: [
    { learnAt: 0, attack: "quick attack" },
    { learnAt: 0, attack: "wing attack" },
    { learnAt: 10, attack: "bug buzz" },
    { learnAt: 20, attack: "brave bird" },
  ],
  jynx: [
    { learnAt: 0, attack: "confusion" },
    { learnAt: 0, attack: "ice beam" },
    { learnAt: 10, attack: "psybeam" },
    { learnAt: 20, attack: "blizzard" },
  ],
  pinsir: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "bug buzz" },
    { learnAt: 10, attack: "pin missile" },
    { learnAt: 20, attack: "leech life" },
  ],
  tauros: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "quick attack" },
    { learnAt: 10, attack: "slam" },
  ],
  eevee: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "quick attack" },
    { learnAt: 10, attack: "slam" },
  ],
  hoothoot: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "gust" },
    { learnAt: 10, attack: "wing attack" },
    { learnAt: 20, attack: "brave bird" },
  ],
  noctowl: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "gust" },
    { learnAt: 0, attack: "wing attack" },
    { learnAt: 10, attack: "brave bird" },
  ],
  togepi: [
    { learnAt: 0, attack: "fairy wind" },
    { learnAt: 10, attack: "dazzling gleam" },
    { learnAt: 20, attack: "moonblast" },
  ],
  togetic: [
    { learnAt: 0, attack: "fairy wind" },
    { learnAt: 0, attack: "dazzling gleam" },
    { learnAt: 10, attack: "moonblast" },
  ],
  snubbull: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "fairy wind" },
    { learnAt: 10, attack: "dazzling gleam" },
    { learnAt: 20, attack: "moonblast" },
  ],
  granbull: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "fairy wind" },
    { learnAt: 0, attack: "dazzling gleam" },
    { learnAt: 10, attack: "moonblast" },
  ],
  teddiursa: [
    { learnAt: 0, attack: "scratch" },
    { learnAt: 0, attack: "quick attack" },
    { learnAt: 10, attack: "slam" },
  ],
  ursaring: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "quick attack" },
    { learnAt: 0, attack: "slam" },
  ],
  swinub: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "ice beam" },
    { learnAt: 10, attack: "earthquake" },
    { learnAt: 20, attack: "blizzard" },
  ],
  piloswine: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "ice beam" },
    { learnAt: 0, attack: "earthquake" },
    { learnAt: 10, attack: "blizzard" },
  ],
  smoochum: [
    { learnAt: 0, attack: "confusion" },
    { learnAt: 0, attack: "ice beam" },
    { learnAt: 10, attack: "psybeam" },
    { learnAt: 20, attack: "blizzard" },
  ],
  seedot: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "razor leaf" },
    { learnAt: 10, attack: "solar beam" },
  ],
  nuzleaf: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "razor leaf" },
    { learnAt: 0, attack: "solar beam" },
  ],
  shiftry: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "razor leaf" },
    { learnAt: 0, attack: "solar beam" },
  ],
  ralts: [
    { learnAt: 0, attack: "confusion" },
    { learnAt: 0, attack: "fairy wind" },
    { learnAt: 10, attack: "psybeam" },
    { learnAt: 20, attack: "psychic" },
  ],
  kirlia: [
    { learnAt: 0, attack: "confusion" },
    { learnAt: 0, attack: "fairy wind" },
    { learnAt: 0, attack: "psybeam" },
    { learnAt: 10, attack: "psychic" },
  ],
  torkoal: [
    { learnAt: 0, attack: "ember" },
    { learnAt: 0, attack: "tackle" },
    { learnAt: 10, attack: "flamethrower" },
    { learnAt: 20, attack: "fire blast" },
  ],
  duskull: [
    { learnAt: 0, attack: "lick" },
    { learnAt: 0, attack: "night shade" },
    { learnAt: 10, attack: "shadow ball" },
  ],
  // Ghost types
  dusclops: [
    { learnAt: 0, attack: "lick" },
    { learnAt: 0, attack: "night shade" },
    { learnAt: 0, attack: "shadow ball" },
  ],
  turtwig: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "razor leaf" },
    { learnAt: 10, attack: "vine whip" },
    { learnAt: 20, attack: "solar beam" },
  ],
  grotle: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "razor leaf" },
    { learnAt: 0, attack: "vine whip" },
    { learnAt: 10, attack: "solar beam" },
  ],
  torterra: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "razor leaf" },
    { learnAt: 0, attack: "vine whip" },
    { learnAt: 0, attack: "solar beam" },
  ],
  snover: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "ice beam" },
    { learnAt: 10, attack: "razor leaf" },
    { learnAt: 20, attack: "blizzard" },
  ],
  abomasnow: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "ice beam" },
    { learnAt: 0, attack: "razor leaf" },
    { learnAt: 10, attack: "blizzard" },
  ],
  rhyperior: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "rock throw" },
    { learnAt: 0, attack: "earthquake" },
    { learnAt: 10, attack: "stone edge" },
  ],
  togekiss: [
    { learnAt: 0, attack: "fairy wind" },
    { learnAt: 0, attack: "gust" },
    { learnAt: 0, attack: "wing attack" },
    { learnAt: 10, attack: "moonblast" },
  ],
  mamoswine: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "ice beam" },
    { learnAt: 0, attack: "earthquake" },
    { learnAt: 10, attack: "blizzard" },
  ],
  gallade: [
    { learnAt: 0, attack: "confusion" },
    { learnAt: 0, attack: "karate chop" },
    { learnAt: 0, attack: "psychic" },
    { learnAt: 10, attack: "low kick" },
  ],
  dusknoir: [
    { learnAt: 0, attack: "lick" },
    { learnAt: 0, attack: "night shade" },
    { learnAt: 0, attack: "shadow ball" },
  ],
  joltik: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "thunder shock" },
    { learnAt: 10, attack: "bug buzz" },
    { learnAt: 20, attack: "thunderbolt" },
  ],
  galvantula: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "thunder shock" },
    { learnAt: 0, attack: "bug buzz" },
    { learnAt: 10, attack: "thunderbolt" },
  ],
  cubchoo: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "ice beam" },
    { learnAt: 10, attack: "aurora beam" },
    { learnAt: 20, attack: "blizzard" },
  ],
  beartic: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "ice beam" },
    { learnAt: 0, attack: "aurora beam" },
    { learnAt: 10, attack: "blizzard" },
  ],
  pawniard: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "metal claw" },
    { learnAt: 10, attack: "bite" },
    { learnAt: 20, attack: "iron tail" },
  ],
  bisharp: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "metal claw" },
    { learnAt: 0, attack: "bite" },
    { learnAt: 10, attack: "iron tail" },
  ],
  honedge: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "metal claw" },
    { learnAt: 10, attack: "shadow ball" },
    { learnAt: 20, attack: "iron tail" },
  ],
  doublade: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "metal claw" },
    { learnAt: 0, attack: "shadow ball" },
    { learnAt: 10, attack: "iron tail" },
  ],
  aegislash: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "metal claw" },
    { learnAt: 0, attack: "shadow ball" },
    { learnAt: 0, attack: "iron tail" },
  ],
  rowlet: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "razor leaf" },
    { learnAt: 10, attack: "vine whip" },
    { learnAt: 20, attack: "solar beam" },
  ],
  dartrix: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "razor leaf" },
    { learnAt: 0, attack: "vine whip" },
    { learnAt: 10, attack: "solar beam" },
  ],
  decidueye: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "razor leaf" },
    { learnAt: 0, attack: "vine whip" },
    { learnAt: 0, attack: "solar beam" },
  ],
  sirfetchd: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "karate chop" },
    { learnAt: 20, attack: "brick break" },
    { learnAt: 30, attack: "close combat" },
  ],
  ursaluna: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "quick attack" },
    { learnAt: 10, attack: "earthquake" },
    { learnAt: 20, attack: "slam" },
  ],
  tinkatink: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "fairy wind" },
    { learnAt: 10, attack: "metal claw" },
    { learnAt: 20, attack: "iron tail" },
  ],
  tinkatuff: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "fairy wind" },
    { learnAt: 0, attack: "metal claw" },
    { learnAt: 10, attack: "iron tail" },
  ],
  tinkaton: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "fairy wind" },
    { learnAt: 0, attack: "metal claw" },
    { learnAt: 0, attack: "iron tail" },
  ],
  elekid: [
    { learnAt: 0, attack: "quick attack" },
    { learnAt: 0, attack: "thunder shock" },
    { learnAt: 20, attack: "slam" },
    { learnAt: 40, attack: "thunderbolt" },
  ],
  electabuzz: [
    { learnAt: 0, attack: "thunder shock" },
    { learnAt: 0, attack: "slam" },
    { learnAt: 10, attack: "thunderbolt" },
    { learnAt: 40, attack: "thunder" },
  ],
  electivire: [
    { learnAt: 0, attack: "slam" },
    { learnAt: 0, attack: "thunderbolt" },
    { learnAt: 10, attack: "thunder" },
  ],
  horsea: [
    { learnAt: 0, attack: "water gun" },
    { learnAt: 10, attack: "bubble beam" },
  ],
  seadra: [
    { learnAt: 0, attack: "water gun" },
    { learnAt: 0, attack: "bubble beam" },
    { learnAt: 20, attack: "hydro pump" },
  ],
  kingdra: [
    { learnAt: 0, attack: "water gun" },
    { learnAt: 0, attack: "bubble beam" },
    { learnAt: 0, attack: "hydro pump" },
    { learnAt: 20, attack: "dragon rage" },
    { learnAt: 40, attack: "dragon claw" },
  ],
  chimchar: [
    { learnAt: 0, attack: "scratch" },
    { learnAt: 0, attack: "ember" },
    { learnAt: 20, attack: "fire spin" },
    { learnAt: 40, attack: "flamethrower" },
  ],
  monferno: [
    { learnAt: 0, attack: "ember" },
    { learnAt: 0, attack: "fire spin" },
    { learnAt: 10, attack: "flamethrower" },
    { learnAt: 40, attack: "fire blast" },
  ],
  infernape: [
    { learnAt: 0, attack: "fire spin" },
    { learnAt: 0, attack: "flamethrower" },
    { learnAt: 10, attack: "fire blast" },
  ],
  mankey: [
    { learnAt: 0, attack: "scratch" },
    { learnAt: 0, attack: "karate chop" },
    { learnAt: 20, attack: "mach punch" },
  ],
  primeape: [
    { learnAt: 0, attack: "karate chop" },
    { learnAt: 0, attack: "mach punch" },
    { learnAt: 20, attack: "high jump kick" },
  ],
  annihilape: [
    { learnAt: 0, attack: "karate chop" },
    { learnAt: 0, attack: "mach punch" },
    { learnAt: 0, attack: "high jump kick" },
    { learnAt: 30, attack: "shadow ball" },
  ],
  grubbin: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "leech life" },
    { learnAt: 20, attack: "bite" },
  ],
  charjabug: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "leech life" },
    { learnAt: 0, attack: "bite" },
    { learnAt: 20, attack: "x-scissor" },
  ],
  vikavolt: [
    { learnAt: 0, attack: "leech life" },
    { learnAt: 0, attack: "bite" },
    { learnAt: 0, attack: "x-scissor" },
    { learnAt: 20, attack: "thunderbolt" },
    { learnAt: 40, attack: "thunder" },
  ],
  froakie: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "water gun" },
    { learnAt: 20, attack: "quick attack" },
    { learnAt: 40, attack: "bubble beam" },
  ],
  frogadier: [
    { learnAt: 0, attack: "water gun" },
    { learnAt: 0, attack: "quick attack" },
    { learnAt: 10, attack: "bubble beam" },
    { learnAt: 40, attack: "hydro pump" },
  ],
  greninja: [
    { learnAt: 0, attack: "water gun" },
    { learnAt: 0, attack: "quick attack" },
    { learnAt: 0, attack: "bubble beam" },
    { learnAt: 10, attack: "hydro pump" },
  ],
  larvitar: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "bite" },
    { learnAt: 10, attack: "rock throw" },
    { learnAt: 20, attack: "dig" },
  ],
  pupitar: [
    { learnAt: 0, attack: "bite" },
    { learnAt: 0, attack: "rock throw" },
    { learnAt: 0, attack: "dig" },
    { learnAt: 30, attack: "crunch" },
  ],
  tyranitar: [
    { learnAt: 0, attack: "bite" },
    { learnAt: 0, attack: "rock throw" },
    { learnAt: 0, attack: "crunch" },
    { learnAt: 20, attack: "dark pulse" },
    { learnAt: 40, attack: "hyper beam" },
  ],
  beldum: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 20, attack: "metal claw" },
  ],
  metang: [
    { learnAt: 0, attack: "metal claw" },
    { learnAt: 0, attack: "confusion" },
    { learnAt: 20, attack: "psychic" },
    { learnAt: 30, attack: "flash cannon" },
  ],
  metagross: [
    { learnAt: 0, attack: "metal claw" },
    { learnAt: 0, attack: "psychic" },
    { learnAt: 0, attack: "flash cannon" },
    { learnAt: 40, attack: "hyper beam" },
  ],
  magikarp: [{ learnAt: 0, attack: "tackle" }],
  gyarados: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "bite" },
    { learnAt: 10, attack: "dragon rage" },
    { learnAt: 30, attack: "hydro pump" },
    { learnAt: 40, attack: "hyper beam" },
  ],
  sneasel: [
    { learnAt: 0, attack: "scratch" },
    { learnAt: 0, attack: "ice beam" },
    { learnAt: 20, attack: "metal claw" },
    { learnAt: 30, attack: "dark pulse" },
  ],
  weavile: [
    { learnAt: 0, attack: "ice beam" },
    { learnAt: 0, attack: "metal claw" },
    { learnAt: 10, attack: "dark pulse" },
    { learnAt: 20, attack: "blizzard" },
    { learnAt: 30, attack: "x-scissor" },
  ],
  heracross: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "horn attack" },
    { learnAt: 20, attack: "mach punch" },
    { learnAt: 40, attack: "high jump kick" },
  ],
  scizor: [
    { learnAt: 0, attack: "quick attack" },
    { learnAt: 0, attack: "metal claw" },
    { learnAt: 20, attack: "x-scissor" },
  ],
  blitzle: [
    { learnAt: 0, attack: "quick attack" },
    { learnAt: 0, attack: "thunder shock" },
    { learnAt: 20, attack: "spark" },
    { learnAt: 30, attack: "thunderbolt" },
  ],
  zebstrika: [
    { learnAt: 0, attack: "quick attack" },
    { learnAt: 0, attack: "thunder shock" },
    { learnAt: 0, attack: "spark" },
    { learnAt: 20, attack: "thunderbolt" },
    { learnAt: 40, attack: "thunder" },
  ],
  shieldon: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "metal claw" },
    { learnAt: 10, attack: "rock throw" },
    { learnAt: 20, attack: "iron tail" },
  ],
  bastiodon: [
    { learnAt: 0, attack: "tackle" },
    { learnAt: 0, attack: "metal claw" },
    { learnAt: 0, attack: "rock throw" },
    { learnAt: 20, attack: "iron tail" },
    { learnAt: 40, attack: "iron head" },
  ],
  houndour: [
    { learnAt: 0, attack: "bite" },
    { learnAt: 0, attack: "ember" },
    { learnAt: 20, attack: "flamethrower" },
    { learnAt: 30, attack: "crunch" },
  ],
  houndoom: [
    { learnAt: 0, attack: "bite" },
    { learnAt: 0, attack: "ember" },
    { learnAt: 0, attack: "flamethrower" },
    { learnAt: 20, attack: "crunch" },
    { learnAt: 40, attack: "fire blast" },
  ],
  zubat: [
    { learnAt: 0, attack: "leech life" },
    { learnAt: 10, attack: "wing attack" },
    { learnAt: 20, attack: "bite" },
    { learnAt: 30, attack: "poison sting" },
    { learnAt: 40, attack: "toxic" },
  ],
  golbat: [
    { learnAt: 0, attack: "wing attack" },
    { learnAt: 0, attack: "bite" },
    { learnAt: 10, attack: "poison sting" },
    { learnAt: 20, attack: "toxic" },
    { learnAt: 30, attack: "shadow ball" },
    { learnAt: 40, attack: "brave bird" },
  ],
  crobat: [
    { learnAt: 0, attack: "wing attack" },
    { learnAt: 0, attack: "poison sting" },
    { learnAt: 10, attack: "toxic" },
    { learnAt: 20, attack: "shadow ball" },
    { learnAt: 30, attack: "brave bird" },
    { learnAt: 40, attack: "x-scissor" },
  ],
  murkrow: [
    { learnAt: 0, attack: "wing attack" },
    { learnAt: 0, attack: "quick attack" },
    { learnAt: 10, attack: "night shade" },
    { learnAt: 20, attack: "dark pulse" },
    { learnAt: 30, attack: "psychic" },
    { learnAt: 40, attack: "brave bird" },
  ],
  honchkrow: [
    { learnAt: 0, attack: "wing attack" },
    { learnAt: 0, attack: "night shade" },
    { learnAt: 10, attack: "dark pulse" },
    { learnAt: 20, attack: "psychic" },
    { learnAt: 30, attack: "brave bird" },
    { learnAt: 40, attack: "shadow ball" },
  ],
} satisfies Record<PokemonName, { learnAt: number; attack: AttackKey }[]>;
