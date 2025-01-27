"use server";

import { auth } from "@/auth";
import { prisma } from "../../../prisma";

export async function updateChapter(chapter: number) {
  const session = await auth();

  if (!session?.user?.name) {
    throw new Error("Not authenticated");
  }

  try {
    const user = await prisma.user.update({
      where: { name: session.user.name },
      data: { chapter },
      select: {
        id: true,
        name: true,
        chapter: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error updating chapter:", error);
    throw new Error("Failed to update chapter");
  }
}
