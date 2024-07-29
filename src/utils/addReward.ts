"use server";

import { Item } from "@/types/item";
import prisma from "../../prisma";
import { connectToDatabase } from "./server-helpers";

export const addReward = async (username: string, reward: Item) => {
  try {
    await connectToDatabase();

    const user = await prisma.user.findUnique({
      where: { name: username },
      select: { items: true },
    });

    if (!user?.items) return null;

    let items: Item[] = user.items as unknown as Item[];

    let rewardItem = items.find((item) => item.name === reward.name);

    if (rewardItem) {
      rewardItem.count += reward.count;
    } else {
      items.push({ name: reward.name, count: reward.count });
    }

    console.log("reward is: ", rewardItem);

    const updatedUser = await prisma.user.update({
      where: { name: username },
      data: {
        items: items as any,
      },
    });

    console.log("updated user: ", updatedUser);

    return updatedUser;
  } catch (error) {
    console.error("error occurs: ", error);
  } finally {
    await prisma.$disconnect();
  }
};
