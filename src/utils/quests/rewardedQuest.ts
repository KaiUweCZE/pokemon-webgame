"use server";

import prisma from "../../../prisma";
import { connectToDatabase } from "../server-helpers";

export const rewardedQuest = async (questId: string) => {
  try {
    await connectToDatabase();

    const quest = await prisma.quest.update({
      where: { id: questId },
      data: {
        rewarded: true,
      },
      select: { rewarded: true },
    });

    if (!quest) {
      console.log("quest does not exist");
      return null;
    }

    return quest;
  } catch (error) {
    console.error("An error occured while rewarding.. ", error);
  } finally {
    await prisma.$disconnect();
  }
};
