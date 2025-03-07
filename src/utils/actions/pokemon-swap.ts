"use server";
import { auth } from "@/auth";
import { prisma } from "../../../prisma";

export async function pokemonSwap(activePokemonIds: string[]) {
  try {
    const session = await auth();

    if (!session?.user?.name) {
      throw new Error("Unauthorized");
    }

    return await prisma.user.update({
      where: { name: session.user.name },
      data: { activePokemonIds },
    });
  } catch (error) {
    console.error("Failed to swap pokemon:", error);
    throw new Error("Failed to swap pokemon");
  }
}
