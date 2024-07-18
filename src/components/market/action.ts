"use server";

import { connectToDatabase } from "@/utils/server-helpers";
import prisma from "../../../prisma";

interface Item {
  item: string;
  count: number;
}

export const buyItem = async (
  username: string,
  item: string,
  cost: number,
  value: number
) => {
  try {
    await connectToDatabase();

    const user = await prisma.user.findUnique({
      where: { name: username },
      select: { items: true },
    });

    if (!user) return null;

    if (user.items === null) return null;

    let items: Item[] = user.items as unknown as Item[];

    if (!Array.isArray(items)) items = [];

    let coins = items.find((i) => i.item === "coins");

    if (!coins || coins.count < value * cost) {
      return { success: false, message: "Not enough coins" };
    }

    coins.count -= value * cost;

    let ownedItem = items.find((i) => i.item === item);
    if (ownedItem) {
      ownedItem.count += value;
    } else {
      items.push({ item: item, count: value });
    }

    const updatedUser = await prisma.user.update({
      where: { name: username },
      data: { items: items as any },
    });

    return updatedUser;
  } catch (error) {
    console.log("error occurs: ", error);
  } finally {
    await prisma.$disconnect();
  }
};
