"use server";

import prisma from "../../../prisma";
import { connectToDatabase } from "../server-helpers";

export const getQuests = async (userId: string) => {
  try {
    await connectToDatabase();

    const quests = await prisma.quest.findMany({
      where: { userId: userId },
      include: { objectives: true },
    });

    if (!quests) {
      console.log("Quests does not exist");
    }

    const questNames = quests.map((q) => q);

    console.log("quests: ", questNames);

    return quests;
  } catch (error) {
    console.error("An error occured while getting quests");
  } finally {
    await prisma.$disconnect();
  }
};
