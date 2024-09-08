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

    let userSix = user.userSix as { pokemonId: string; order: number }[];

    if (userSix.length === 0) {
      return [];
    }

    const pokemonIds = userSix.map((entry) => entry.pokemonId);

    const pokemons = await prisma.pokemon.findMany({
      where: {
        id: {
          in: pokemonIds,
        },
      },
    });

    const result = userSix.map((pokemonFromSix) => {
      const pokemonData = pokemons.find(
        (pokemon) => pokemon.id === pokemonFromSix.pokemonId
      );
      return {
        ...pokemonData,
        order: pokemonFromSix.order,
      };
    });

    result.sort((a, b) => a.order - b.order);

    console.log("users six: ", result);

    return result;
  } catch (error) {
    console.error("Error fetching user's pokemon:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
