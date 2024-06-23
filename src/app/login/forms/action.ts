"use server";
import { connectToDatabase } from "@/utils/server-helpers";
import bcrypt from "bcrypt";
import prisma from "../../../../prisma";

export const signUp = async (formData: FormData) => {
  const username = formData.get("name") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    throw new Error("Missing username or password");
  }

  try {
    await connectToDatabase();
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { name: username },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { name: username, hashedPassword },
    });

    // Return some useful information about the new user, excluding the password
    return {
      id: newUser.id,
      username: newUser.name,
    };
  } catch (error) {
    // Log the error and re-throw it or handle it as needed
    console.error("Error in signUp function:", error);
    throw error; // or return a custom error object/message if you prefer
  }
};
