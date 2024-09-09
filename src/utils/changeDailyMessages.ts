"use server";

import prisma from "../../prisma";
import { connectToDatabase } from "./server-helpers";

export const changeDailyMessage = async (userId: string, day: number) => {
  try {
    await connectToDatabase();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { dailyMessage: true },
    });

    if (!user) return null;

    if (user.dailyMessage >= day) return null;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { dailyMessage: day },
    });

    console.log("message was written down: ", updatedUser.dailyMessage);

    return updatedUser;
  } catch (error) {
    console.error("an error occured in newChapter function");
  } finally {
    await prisma.$disconnect();
  }
};
