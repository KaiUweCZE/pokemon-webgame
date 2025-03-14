"use server";
import { auth } from "@/auth";
import { prisma } from "../../../prisma";

export const healSix = async () => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        partOfDay: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.partOfDay >= 2) {
      throw new Error("No more activities available today. Wait for tomorrow.");
    }

    const activePokemons = await prisma.pokemon.findMany({
      where: {
        userId: session.user.id,
        isActive: true,
      },
      select: {
        id: true,
        maxHp: true,
        maxEnergy: true,
      },
    });

    await prisma.$transaction(async (tx) => {
      // Heal all active pokemon
      for (const pokemon of activePokemons) {
        await tx.pokemon.update({
          where: { id: pokemon.id },
          data: {
            currentHp: pokemon.maxHp,
            currentEnergy: pokemon.maxEnergy,
            statusEffects: [],
          },
        });
      }

      // Update user's partOfDay
      await tx.user.update({
        where: { id: session.user.id },
        data: {
          partOfDay: user.partOfDay + 1,
        },
      });
    });

    const updatedUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { partOfDay: true },
    });

    return {
      success: true,
      healedCount: activePokemons.length,
      partOfDay: updatedUser?.partOfDay || user.partOfDay + 1,
    };
  } catch (error) {
    console.error("Error healing pokemon:", error);
    throw new Error("Failed to heal pokemon");
  }
};
