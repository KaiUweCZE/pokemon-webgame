export const npcQuestsData = [
  {
    name: "Save Our Village",
    description: "Hey man, there is a lot of zubats and I need your help",
    from: "Sheriff",
    startDay: 5,
    endDay: 8,
    location: null,
    objectives: [
      {
        type: "eliminatePokemon",
        target: "Zubat",
        requiredAmount: 5,
        currentAmount: 0,
        completed: false,
      },
    ],
    rewards: [
      { name: "coins", count: 100 },
      { name: "pokeball", count: 5 },
    ],
    completed: false,
    progress: "{}",
  },
];
