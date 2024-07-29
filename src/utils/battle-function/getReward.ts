export const getReward = (enemyLevel: number) => {
  const reward = { name: "coins", count: enemyLevel * 10 };
  return reward;
};
