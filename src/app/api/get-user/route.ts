import { connectToDatabase } from "@/utils/server-helpers";
import prisma from "../../../../prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { name } = await req.json();

    console.log("Attempting to connect to the database...");
    await connectToDatabase();
    console.log("Database connected successfully.");

    console.log(`Fetching user with ID: ${name} from the database...`);
    const user = await prisma.user.findUnique({
      where: { name: name }, // Ensure id is a number if that's the type in your schema
    });

    if (!user) {
      console.log(`User with ID: ${name} not found.`);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(`User with ID: ${name} fetched successfully.`);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  } finally {
    console.log("Disconnecting from the database...");
    await prisma.$disconnect();
    console.log("Disconnected from the database.");
  }
};
