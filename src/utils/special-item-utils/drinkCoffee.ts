"use server";
import prisma from "../../../prisma";
import { connectToDatabase } from "../server-helpers";

export const drinkCoffee = async (username: string) => {
  try {
    await connectToDatabase();

    const user = await prisma.user.findUnique({
      where: { name: username },
      select: { partOfDay: true, items: true },
    });

    const items = user?.items as { name: string; count: number }[];
    const coffeeItem = items.find((item) => item.name === "coffee");

    if (!user) {
      console.error("User not found during drinking a coffee");
      return null;
    }

    if (user?.partOfDay === 0 || !coffeeItem || coffeeItem.count === 0) {
      console.log(
        "Cannot drink coffee: either it's night time or user has no coffee"
      );
      return null;
    }

    const updatedItems = items.map((item) =>
      item.name === "coffee" ? { ...item, count: item.count - 1 } : item
    );

    const updatedUser = await prisma.user.update({
      where: { name: username },
      data: {
        partOfDay: { decrement: 1 },
        items: updatedItems,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("An error occured during drinking a coffee", error);
  } finally {
    await prisma.$disconnect();
  }
};
