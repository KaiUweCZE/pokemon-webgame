import prisma from "../../prisma";
import { connectToDatabase } from "./server-helpers";

export const addPokemonToSix = async (username: string, pokemonId: string) => {
  try {
    await connectToDatabase();

    const user = await prisma.user.findUnique({
      where: { name: username },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.userSix && user.userSix.length >= 6) {
      throw new Error("User's six is already full");
    }

    if (user.userSix && user.userSix.includes(pokemonId)) {
      throw new Error("Pokemon is already in the user's six");
    }

    const updatedUser = await prisma.user.update({
      where: { name: username },
      data: {
        userSix: { push: pokemonId },
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error in addPokemonToSix function", error);
    throw new Error("Server error: Unable to add pokemon to user's six");
  } finally {
    await prisma.$disconnect();
  }
};
