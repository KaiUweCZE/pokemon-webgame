"use server";

import { Item } from "@/types/item";
import prisma from "../../../prisma";
import { connectToDatabase } from "../server-helpers";
import { count } from "console";

export const addItems = async (items: Item[], userId: string) => {
  try {
    await connectToDatabase();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { items: true },
    });

    if (!user) {
      console.log("user is missing");
      return null;
    }

    const userItems = user.items as { name: string; count: number }[];

    const itemsMap = items.reduce((acc, item) => {
      acc[item.name] = item.count;
      return acc;
    }, {} as Record<string, number>);

    const updatedItems = userItems.map((i) =>
      i.name in itemsMap
        ? { name: i.name, count: i.count + itemsMap[i.name] }
        : i
    );

    // add items that are not in updatedItems
    items.forEach((item) => {
      if (!userItems.some((userItem) => userItem.name === item.name)) {
        updatedItems.push(item);
      }
    });

    await prisma.user.update({
      where: { id: userId },
      data: { items: updatedItems },
    });

    return updatedItems;
  } catch (error) {
    console.error("An error occured while adding items: ", error);
  } finally {
    await prisma.$disconnect();
  }
};
