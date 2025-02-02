"use server";
import { auth } from "@/auth";
import { prisma } from "../../../prisma";

export const nextDay = async () => {
  const session = await auth();

  if (!session?.user?.name) {
    throw new Error("Not authenticated");
  }
  try {
    const user = await prisma.user.findUnique({
      where: { name: session.user.name },
      select: {
        day: true,
        partOfDay: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await prisma.user.update({
      where: { name: session.user.name },
      data: {
        day: user.day + 1,
        partOfDay: 0,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating day:", error);
    throw error;
  }
};

export const spentPartOfDay = async () => {
  const session = await auth();

  if (!session?.user?.name) {
    throw new Error("Not authenticated");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { name: session.user.name },
      select: {
        partOfDay: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if we're at the last part of the day
    if (user.partOfDay >= 2) {
      throw new Error("Leave it for tomorrow");
    }

    const updatedUser = await prisma.user.update({
      where: { name: session.user.name },
      data: {
        partOfDay: user.partOfDay + 1,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating part of day:", error);
    throw error;
  }
};
