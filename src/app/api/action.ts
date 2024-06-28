"use server";
import { connectToDatabase } from "@/utils/server-helpers";
import prisma from "../../../prisma";
import { getSession, useSession } from "next-auth/react";

export const getUser = async () => {
  try {
    await connectToDatabase();

    /*const session = await getSession();
    // Return some useful information about the new user, excluding the password
    if (!session || !session.user || !session.user.name) {
      throw new Error("No user session found.");
    }*/

    const user = await prisma.user.findUnique({
      where: { name: "kai-uwe" },
    });

    return { user };
  } catch (error) {
    // Log the error and re-throw it or handle it as needed
    console.error("Error in getUser function:", error);
    throw error; // or return a custom error object/message if you prefer
  }
};
