export interface Pokemon {
  id: string;
  name: string;
  level: number;
  attacks: string[];
  speed: number;
  hp: number;
  actualHp: number;
  energy: number;
  damage: number;
  defense: number;
  userId: string | null;
}
