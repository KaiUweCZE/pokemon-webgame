"use server";

import { Quest } from "@/types/quest";
import prisma from "../../../prisma";
import { connectToDatabase } from "../server-helpers";

export const createQuest = async (quest: Quest | null, userId: string) => {
  try {
    connectToDatabase();

    if (!quest) return;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      //select: {completedQuests: true}
    });

    if (!user) return;

    if (user.completedQuests.includes(quest.name)) {
      console.log("Quest has already been completed by this user");
      return null;
    }

    const rewards = quest.rewards as { name: string; count: number }[];

    const duration = quest.endDay ? user.day + quest.endDay : null;

    const createdQuest = await prisma.quest.create({
      data: {
        name: quest.name,
        from: quest.from,
        description: quest.description,
        startDay: user.day,
        endDay: duration,
        rewards: rewards,
        userId: userId,
        objectives: {
          create: quest.objectives.map((obj) => ({
            type: obj.type,
            target: obj.target,
            requiredAmount: obj.requiredAmount,
            currentAmount: 0,
            completed: false,
          })),
        },
        rewarded: false,
        progress: JSON.stringify({}),
      },
      include: {
        objectives: true,
      },
    });

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        completedQuests: { push: quest.name },
      },
    });

    console.log("quest was created");

    return createdQuest;
  } catch (error) {
    console.error("an error occured while creating a quest", error);
  } finally {
    await prisma.$disconnect();
  }
};
