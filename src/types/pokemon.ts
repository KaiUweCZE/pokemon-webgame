export interface Pokemon {
  id: string;
  name: string;
  type: string[];
  level: number;
  attacks: string[];
  abilities: string[];
  speed: number;
  hp: number;
  actualHp: number;
  actualEnergy: number;
  expToLevel: number;
  actualExp: number;
  energy: number;
  damage: number;
  defense: number;
  evolutionInformed: boolean;
  userId: string | null;
}
