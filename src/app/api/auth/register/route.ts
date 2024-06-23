import { connectToDatabase } from "@/utils/server-helpers";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const { username, password } = await req.json();
    if (!username || !password)
      return NextResponse.json({ message: "invalid data" }, { status: 422 });
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectToDatabase();
    const newUser = await prisma.user.create({
      data: { username, hashedPassword },
    });
    return NextResponse.json({ newUser }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
