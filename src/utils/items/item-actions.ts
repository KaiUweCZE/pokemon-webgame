"use server";
import { auth } from "@/auth";
import { prisma } from "../../../prisma";
import { ItemName } from "@/types/item";

export const getItem = async (item: { itemName: ItemName; quantity: number }, userId: string) => {
  try {
    const session = await auth();

    if (!session?.user?.name) {
      throw new Error("Not authenticated");
    }

    const user = await prisma.user.findUnique({
      where: { name: session.user.name },
      select: {
        id: true,
        inventory: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const existingItem = user?.inventory.find((i) => i.name === item.itemName);

    if (existingItem) {
      const updatedItem = await prisma.inventoryItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + item.quantity },
      });
      return updatedItem;
    } else {
      const newItem = await prisma.inventoryItem.create({
        data: {
          name: item.itemName,
          quantity: item.quantity,
          userId: userId,
          // illustration of metadata
          metadata: {
            acquiredAt: new Date(),
            lastUsed: null,
          },
        },
      });
      return newItem;
    }
  } catch (error) {
    console.error("Error getting item:", error);
    throw error;
  }
};

export const buyItem = async () => {
  try {
    const session = await auth();

    if (!session?.user?.name) {
      throw new Error("Not authenticated");
    }

    const user = await prisma.user.findUnique({
      where: { name: session.user.name },
    });

    if (!user) {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error buying item:", error);
    throw new Error("Error buying item");
  }
};
