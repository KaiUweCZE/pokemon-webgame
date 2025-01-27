import { NextResponse } from "next/server";
import { prisma } from "@/../prisma";
import { hashPassword } from "@/utils/password";
import { signInSchema } from "@/lib/zod";
import { ZodError } from "zod";
import { Prisma, PrismaClient } from "@prisma/client";

// Ensure we have a Prisma instance
const prismaClient = prisma || new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received registration request:", { ...body, password: "[REDACTED]" });

    let validatedData;
    try {
      validatedData = signInSchema.parse(body);
    } catch (validationError) {
      if (validationError instanceof ZodError) {
        const errors = validationError.errors.map((err) => err.message).join(", ");
        console.log("Validation failed:", errors);
        return NextResponse.json({ error: errors }, { status: 400 });
      }
      throw validationError;
    }

    const { name, password } = validatedData;

    try {
      // Check if user already exists
      const existingUser = await prismaClient.user.findUnique({
        where: { name },
      });

      if (existingUser) {
        console.log("Registration failed: User already exists", { name });
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
      }

      // Hash password and create user
      const hashedPassword = await hashPassword(password);
      console.log("Creating new user:", { name });

      const user = await prismaClient.user.create({
        data: {
          name,
          password: hashedPassword,
        },
      });

      console.log("User created successfully:", { userId: user.id });
      return NextResponse.json(
        {
          message: "User created successfully",
          userId: user.id,
        },
        { status: 201 }
      );
    } catch (dbError) {
      console.error("Database error:", dbError);
      if (dbError instanceof Prisma.PrismaClientKnownRequestError) {
        if (dbError.code === "P2002") {
          return NextResponse.json({ error: "Username already taken" }, { status: 400 });
        }
      }
      throw dbError;
    }
  } catch (error: any) {
    console.error("Registration error details:", error);
    return NextResponse.json(
      {
        error: "Database connection error. Please make sure your database is properly configured.",
      },
      { status: 500 }
    );
  }
}
