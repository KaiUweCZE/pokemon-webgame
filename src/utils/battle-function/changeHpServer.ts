"use server";

import prisma from "../../../prisma";
import { connectToDatabase } from "../server-helpers";

export const changeHpServer = async (pokemonId: string, newHp: number) => {
  try {
    connectToDatabase();

    const pokemon = await prisma.pokemon.findUnique({
      where: { id: pokemonId },
      select: { actualHp: true },
    });

    if (!pokemon) return null;

    // Ensure newHp is not negative
    const updatedHp = Math.max(0, newHp);

    const pokemonUpdated = await prisma.pokemon.update({
      where: { id: pokemonId },
      data: {
        ...pokemon,
        actualHp: updatedHp,
      },
    });

    return pokemonUpdated;
  } catch (error) {
    console.error("error occurs: ", error);
  } finally {
    await prisma.$disconnect();
  }
};
