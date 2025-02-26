"use server";
import { auth } from "@/auth";
import { prisma } from "../../../prisma";

export const healSix = async () => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
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

    const updatedPokemons = activePokemons.map((pokemon) =>
      prisma.pokemon.update({
        where: { id: pokemon.id },
        data: {
          currentHp: pokemon.maxHp,
          currentEnergy: pokemon.maxEnergy,
          statusEffects: [],
        },
      })
    );

    await Promise.all(updatedPokemons);

    return { success: true, healedCount: activePokemons.length };
  } catch (error) {
    console.error("Error healing pokemon:", error);
    throw new Error("Failed to heal pokemon");
  }
};
