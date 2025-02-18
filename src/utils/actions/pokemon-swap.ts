"use server";
import { auth } from "@/auth";
import { prisma } from "../../../prisma";

export async function pokemonSwap(activePokemonIds: string[]) {
  const session = await auth();

  if (!session?.user?.name) {
    throw new Error("Unauthorized");
  }

  return await prisma.user.update({
    where: { name: session.user.name },
    data: { activePokemonIds },
  });
}
