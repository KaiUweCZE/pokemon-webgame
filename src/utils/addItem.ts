"use server";
import prisma from "../../prisma";
import { connectToDatabase } from "./server-helpers";

export const addItem = async (
  item: string,
  value: number,
  username: string
) => {
  try {
    await connectToDatabase();

    const user = await prisma.user.findUnique({
      where: { name: username },
      select: { items: true },
    });

    if (!user) return null;

    let items = user.items as { name: string; count: number }[];

    const itemIndex = items.findIndex((i) => i.name === item);

    if (itemIndex !== -1) {
      items[itemIndex].count += value;
    } else {
      items.push({ name: item, count: value });
    }

    const updateUser = await prisma.user.update({
      where: { name: username },
      data: { items },
    });

    console.log(`updated user: ${updateUser.items}`);

    return updateUser;
  } catch (error) {
    console.log("errors occurs", error);
  } finally {
    await prisma.$disconnect();
  }
};
