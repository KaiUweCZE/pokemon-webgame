"use server";

import { auth } from "@/auth";
import { prisma } from "../../../prisma";

export const removeFromTeam = async (pokemonId: string) => {
  try {
    const session = await auth();

    if (!session?.user.id) {
      throw new Error("Not authenticated");
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        activePokemonIds: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // check if pokemon exists
    if (!user.activePokemonIds.includes(pokemonId)) {
      throw new Error("Pokemon not in active team");
    }

    const newPokemonTeam = user.activePokemonIds.filter((id) => id !== pokemonId);

    const updatedData = await prisma.$transaction([
      prisma.pokemon.update({
        where: { id: pokemonId },
        data: {
          isActive: false,
        },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          activePokemonIds: newPokemonTeam,
        },
      }),
    ]);

    console.log("updated data: ", newPokemonTeam);

    return { success: true, data: updatedData };
  } catch (error) {
    console.error("Failed to remove pokemon from team:", error);
    throw new Error("Failed to remove pokemon from team");
  }
};
