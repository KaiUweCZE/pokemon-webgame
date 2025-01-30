"use server";
import { auth } from "@/auth";
import { prisma } from "../../../prisma";

export const nextChapter = async () => {
  const session = await auth();

  if (!session?.user?.name) {
    throw new Error("Not authenticated");
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { name: session.user.name },
      data: {
        chapter: {
          increment: 1,
        },
      },
      select: {
        chapter: true,
      },
    });

    return { success: true, chapter: updatedUser.chapter };
  } catch (error) {
    console.error("Failed to update chapter:", error);
    throw new Error("Failed to update chapter");
  }
};
