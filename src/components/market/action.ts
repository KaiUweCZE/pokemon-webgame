"use server";

import { connectToDatabase } from "@/utils/server-helpers";
import prisma from "../../../prisma";

interface Item {
  name: string;
  count: number;
}

export const buyItem = async (
  username: string,
  item: string,
  cost: number,
  amount: number
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

    let coins = items.find((i) => i.name === "coins");

    if (!coins || coins.count < amount * cost) {
      return null;
    }

    coins.count -= amount * cost;

    let ownedItem = items.find((i) => i.name === item);
    if (ownedItem) {
      ownedItem.count += amount;
    } else {
      items.push({ name: item, count: amount });
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

export const sellItem = async (
  username: string,
  itemName: string,
  cost: number,
  amount: number
) => {
  try {
    await connectToDatabase();

    const user = await prisma.user.findUnique({
      where: { name: username },
      select: { items: true },
    });

    if (!user) return null;

    let items: Item[] = user.items as unknown as Item[];

    let sellingItem = items.find((i) => i.name === itemName);

    if (!sellingItem || sellingItem.count < amount) return null;

    let coins = items.find((i) => i.name === "coins");
    let newCoinValue = coins && coins?.count + amount * cost;

    console.log(
      "newvalue, coins, amount, cost ",
      newCoinValue,
      coins?.count,
      amount,
      cost
    );

    let updatedItems = items.map((item) => {
      if (item.name === itemName) {
        return { ...item, count: item.count - amount };
      }
      if (item.name === "coins") {
        return { ...item, count: newCoinValue };
      }
      return item;
    });

    if (!coins) {
      updatedItems.push({ name: "coins", count: newCoinValue });
    }

    const updatedUser = await prisma.user.update({
      where: { name: username },
      data: {
        items: updatedItems as any,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("error occurs: ", error);
  } finally {
    await prisma.$disconnect();
  }
};
