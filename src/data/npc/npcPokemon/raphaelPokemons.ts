interface oponentPokemon {
  id: number;
  name: string;
  level: number;
  damage: number;
  defense: number;
  hp: number;
  energy: number;
  actualHp: number;
}

export const raphaelPokemons = {
  id: "Raphael",
  pokemons: [
    {
      name: "Squirtle",
      type: ["water"],
      level: 25,
      attacks: ["Karate Chop", "Submission", "Seismic Toss", "Focus Energy"],
      abilities: ["Guts", "No Guard"],
      speed: 45,
      damage: 100,
      hp: 80,
      actualHp: 80,
      defense: 70,
      energy: 20,
      actualEnergy: 20,
    },
    {
      name: "Turtwig",
      type: ["grass"],
      level: 22,
      attacks: ["Razor Leaf", "Fake Out", "Feint Attack", "Nature Power"],
      abilities: ["Chlorophyll", "Early Bird"],
      speed: 60,
      damage: 70,
      hp: 70,
      actualHp: 70,
      defense: 40,
      energy: 20,
      actualEnergy: 20,
    },
    {
      name: "Torkoal",
      type: ["fire"],
      level: 30,
      attacks: ["Leaf Blade", "Feint Attack", "Hurricane", "Foul Play"],
      abilities: ["Chlorophyll", "Early Bird"],
      speed: 80,
      damage: 100,
      hp: 90,
      actualHp: 90,
      defense: 60,
      energy: 20,
      actualEnergy: 20,
    },
  ],
};
