export interface oponentPokemon {
  //id: number;
  name: string;
  type: string[];
  abilities: string[];
  attacks: string[];
  level: number;
  damageRate: number;
  defenseRate: number;
  hpRate: number;
  speedRate: number;
  energyRate: number;
}

export const npcPokemons = [
  {
    id: "Kamakawiwo",
    pokemons: [
      {
        name: "Machoke",
        type: ["fighting"],
        level: 25,
        attacks: ["Karate Chop", "Submission", "Seismic Toss", "Focus Energy"],
        abilities: ["Guts", "No Guard"],
        speedRate: 1.2,
        damageRate: 1,
        hpRate: 1,
        defenseRate: 1,
        energyRate: 1,
      },
      {
        name: "Nuzleaf",
        type: ["grass", "dark"],
        level: 22,
        attacks: ["Razor Leaf", "Fake Out", "Feint Attack", "Nature Power"],
        abilities: ["Chlorophyll", "Early Bird"],
        speedRate: 1,
        damageRate: 0.6,
        hpRate: 1,
        defenseRate: 1.2,
        energyRate: 1,
      },
      {
        name: "Shiftry",
        type: ["grass", "dark"],
        level: 30,
        attacks: ["Leaf Blade", "Feint Attack", "Hurricane", "Foul Play"],
        abilities: ["Chlorophyll", "Early Bird"],
        speedRate: 1.3,
        damageRate: 1.3,
        hpRate: 0.8,
        defenseRate: 0.9,
        energyRate: 1,
      },
    ],
  },
];
