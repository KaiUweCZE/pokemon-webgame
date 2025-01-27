"use server";
import { auth } from "@/auth";
import { prisma } from "../../../prisma";

export async function updateProfileImage(profileImg: string) {
  const session = await auth();

  if (!session?.user?.name) {
    throw new Error("Not authenticated");
  }

  await prisma.user.update({
    where: { name: session.user.name },
    data: { profileImg },
  });
}
