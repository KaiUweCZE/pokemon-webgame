"use server";
import { connectToDatabase } from "@/utils/server-helpers";
import prisma from "../../../prisma";

export const nextDay = async (username: string) => {
  try {
    connectToDatabase();

    if (!username) {
      return null;
    }

    const newUser = await prisma.user.update({
      where: { name: username },
      data: {
        day: {
          increment: 1,
        },
      },
    });
    console.log("day is succesfully updated");

    return newUser;
  } catch (error) {
    console.error("Error updating user day:", error);
  } finally {
    prisma.$disconnect();
  }
};
