"use server";
import prisma from "../../../prisma";
import { connectToDatabase } from "../server-helpers";

export const getSix = async (username: string) => {
  try {
    await connectToDatabase();

    const user = await prisma.user.findUnique({
      where: { name: username },
      select: {
        userSix: true,
      },
    });
    if (!user) {
      console.error("User not found");
      return null;
    }

    const { userSix } = user;

    const pokemons = await prisma.pokemon.findMany({
      where: {
        id: { in: userSix },
      },
    });

    return pokemons;
  } catch (error) {
    console.error("Error fetching user's pokemon:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
