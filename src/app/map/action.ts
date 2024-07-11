"use server";
import { connectToDatabase } from "@/utils/server-helpers";
import prisma from "../../../prisma";
import { error } from "console";

export const changeLocation = async (username: string, newLocation: string) => {
  try {
    await connectToDatabase();

    const user = await prisma.user.findUnique({
      where: { name: username },
    });

    if (!user) {
      console.log("user is missing");
      return null;
    }

    if (user.partOfDay >= 3) {
      return { error: "You must wait until the next day" };
    }

    const updateUser = await prisma.user.update({
      where: {
        name: username,
      },
      data: {
        location: newLocation,
        partOfDay: {
          increment: 1,
        },
      },
    });

    if (!updateUser) {
      console.log("error occured while updating the user");

      return null;
    }

    console.log("updated user location is: ", updateUser.location);

    return updateUser;
  } catch (error) {
    console.log("error: ", error);
  } finally {
    await prisma.$disconnect();
  }
};
