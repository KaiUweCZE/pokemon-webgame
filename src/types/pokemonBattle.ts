export interface PokemonBattle {
  name: string;
  type: string[];
  level: number;
  attacks: string[];
  abilities: string[];
  speed: number;
  damage: number;
  hp: number;
  actualHp: number;
  defense: number;
  energy: number;
  actualEnergy: number;
}
