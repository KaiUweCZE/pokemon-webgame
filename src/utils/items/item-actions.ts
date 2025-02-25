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

    if (!session?.user.id) {
      throw new Error("Not authenticated");
    }

    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: session.user.id },
        select: { id: true, inventory: true },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // 1.update money
      const userMoney = user.inventory.find((i) => i.name === "coins");

      if (userMoney) {
        // user has money
        await tx.inventoryItem.update({
          where: {
            userId_name: { userId: user.id, name: "coins" },
          },
          data: { quantity: userMoney.quantity + money },
        });
      } else if (money > 0) {
        // create new item "coins"
        await tx.inventoryItem.create({
          data: {
            name: "coins",
            quantity: money,
            userId: user.id,
            metadata: { acquiredAt: new Date() },
          },
        });
      } else {
        throw new Error("Not enough money");
      }

      // 2. update source item
      const existingItem = user.inventory.find((i) => i.name === item.itemName);

      if (existingItem) {
        const newQuantity = existingItem.quantity + item.quantity;

        if (newQuantity <= 0) {
          // Pokud by nové množství bylo 0 nebo méně, item smažeme
          await tx.inventoryItem.update({
            where: { id: existingItem.id },
            data: { quantity: 0 },
          });
        } else {
          // update quantity of item
          await tx.inventoryItem.update({
            where: { id: existingItem.id },
            data: { quantity: newQuantity },
          });
        }
      } else if (item.quantity > 0) {
        // if we add new item we create it
        await tx.inventoryItem.create({
          data: {
            name: item.itemName,
            quantity: item.quantity,
            userId: user.id,
            metadata: { acquiredAt: new Date() },
          },
        });
      } else {
        throw new Error(`Cannot sell item '${item.itemName}' that you don't have`);
      }

      // return updated user inventory
      const updatedUser = await tx.user.findUnique({
        where: { id: user.id },
        select: { inventory: true },
      });

      return updatedUser?.inventory || [];
    });
  } catch (error) {
    console.error("Error transferring item:", error);
    throw error instanceof Error ? error : new Error("Unknown error transferring item");
  }
};
