type Objective = {
  type: string;
  target: string;
  requiredAmount: number;
};

type QuestData = {
  name: string;
  description: string;
  from: string;
  minDay: number;
  duration: number;
  objectives: Objective[];
  rewards: { name: string; count: number }[];
};

export const npcQuestsData = [
  {
    name: "Save Our Village",
    description: "Hey man, there is a lot of zubats and I need your help",
    from: "Sheriff",
    minDay: 5,
    duration: 3,
    objectives: [
      { type: "eliminatePokemon", target: "Zubat", requiredAmount: 5 },
    ],
    rewards: [
      { name: "coins", count: 100 },
      { name: "pokeball", count: 5 },
    ],
  },
];
