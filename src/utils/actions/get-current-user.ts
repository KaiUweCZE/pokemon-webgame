"use server";

import { auth } from "@/auth";
import { prisma } from "../../../prisma";

export async function getCurrentUser() {
  const session = await auth();

  console.log("getCurrentUser - session:", session);

  if (!session?.user?.name) {
    console.log("getCurrentUser - no user in session");
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { name: session.user.name },
      select: {
        id: true,
        name: true,
        email: true,
        chapter: true,
        createdAt: true,
      },
    });

    console.log("getCurrentUser - found user:", user);
    if (user) {
      await prisma.$disconnect();
    } else {
      await prisma.$disconnect();
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
