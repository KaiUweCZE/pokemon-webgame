"use server";
import prisma from "../../../prisma";
import { connectToDatabase } from "../server-helpers";

export const getUniqueQuest = async (questId: string) => {
  try {
    await connectToDatabase();

    const quest = await prisma.quest.findUnique({
      where: { id: questId },
    });

    if (!quest) {
      console.log("Quests does not exist");
    }

    console.log("quests: ", quest?.name);

    return quest;
  } catch (error) {
    console.error("An error occured while getting quests");
  } finally {
    await prisma.$disconnect();
  }
};
