"use server";
import { prisma } from "../../../prisma";
import bcrypt from "bcryptjs";

export const signUp = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;


  if (!name || !password) {
    return { error: "Missing username or password" };
  }

  try {
 
    const existingUser = await prisma.user.findUnique({
      where: { name },
    });

    console.log("existing user: ", existingUser);
    
    if (existingUser) {
      console.log("User already exists");
      return { error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Hashed password:", hashedPassword);

    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
      },
    });

    console.log("User created:", user);
    return { user, success: true };
  } catch (error: any) {
    console.error("Registration error details:", {
      message: error?.message,
      code: error?.code,
      stack: error?.stack,
    });

    return {
      error: error?.message || "Database connection failed. Check your DB configuration.",
    };
  }
};
