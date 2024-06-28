import { connectToDatabase } from "@/utils/server-helpers";
import prisma from "../../../../prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    console.log("Attempting to connect to the database...");
    await connectToDatabase();
    console.log("Database connected successfully.");

    console.log("Fetching users from the database...");
    const users = await prisma.user.findMany();
    console.log("Users fetched successfully.");

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  } finally {
    console.log("Disconnecting from the database...");
    await prisma.$disconnect();
    console.log("Disconnected from the database.");
  }
};
