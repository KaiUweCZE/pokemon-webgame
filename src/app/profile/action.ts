"use server";
import { connectToDatabase } from "@/utils/server-helpers";
import prisma from "../../../prisma";

export const getProfile = async (username: string) => {
  if (!username) {
    throw new Error("Username is required");
  }

  try {
    console.log("Attempting to connect to the database...");
    await connectToDatabase();
    console.log("Database connected successfully.");

    console.log(`Fetching user with name: ${username} from the database...`);
    const user = await prisma.user.findUnique({
      where: { name: username },
    });

    if (!user) {
      console.log(`User with name: ${username} not found.`);
      return { error: "User not found" }; // Return a custom error object/message if you prefer
    }

    console.log(`User with name: ${user} fetched successfully.`);
    return user;
  } catch (error) {
    console.error("Error in getProfile function:", error);
    throw new Error("Server error: Unable to fetch user profile");
  } finally {
    console.log("Disconnecting from the database...");
    await prisma.$disconnect();
    console.log("Disconnected from the database.");
  }
};
