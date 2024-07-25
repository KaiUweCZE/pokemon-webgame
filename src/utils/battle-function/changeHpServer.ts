"use server";

import prisma from "../../../prisma";
import { connectToDatabase } from "../server-helpers";

export const changeHpServer = async (pokemonId: string, damage: number) => {
  try {
    connectToDatabase();

    const pokemon = await prisma.pokemon.findUnique({
      where: { id: pokemonId },
      select: { actualHp: true },
    });

    if (!pokemon) return null;

    let newHp = pokemon?.actualHp - damage < 0 ? 0 : pokemon?.actualHp - damage;

    const pokemonUpdated = await prisma.pokemon.update({
      where: { id: pokemonId },
      data: {
        ...pokemon,
        actualHp: newHp,
      },
    });

    return pokemonUpdated;
  } catch (error) {
    console.error("error occurs: ", error);
  } finally {
    await prisma.$disconnect();
  }
};
