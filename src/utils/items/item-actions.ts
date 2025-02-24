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

export const transferItem = async (
  item: { itemName: ItemName; quantity: number },
  money: number
) => {
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

    const userMoney = user.inventory.find((i) => i.name === "coins");

    // user doesn't have money so we add this item => ()
    if (!userMoney) {
      const addMoneyToUser = await prisma.inventoryItem.create({
        data: {
          name: "coins",
          quantity: money,
          userId: user.id,
          metadata: {
            acquiredAt: new Date(),
            lastUsed: null,
          },
        },
      });
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
          userId: user.id,
          // illustration of metadata
          metadata: {
            acquiredAt: new Date(),
            lastUsed: null,
          },
        },
      });
    }

    //
    const changeUserMoney = await prisma.user.update({
      where: { name: session.user.name },
      data: {
        inventory: {
          update: {
            where: { name: "coins", userId: user.id },
            data: { quantity: userMoney?.quantity ?? 0 + money },
          },
        },
      },
    });
    return changeUserMoney;
  } catch (error) {
    console.error("Error buying item:", error);
    throw new Error("Error buying item");
  }
};
