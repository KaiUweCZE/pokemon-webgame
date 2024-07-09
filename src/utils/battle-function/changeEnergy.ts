"use server";
import prisma from "../../../prisma";
import { connectToDatabase } from "../server-helpers";

interface ChangeEnergyProps {
  pokemonId: string;
  energyCost: number;
}

export const changeEnergy = async ({
  pokemonId,
  energyCost,
}: ChangeEnergyProps) => {
  try {
    await connectToDatabase();
    console.log("connection to database was successful");

    const updatedPokemon = await prisma.pokemon.update({
      where: { id: pokemonId },
      data: {
        actualEnergy: {
          increment: -energyCost,
        },
      },
    });
    console.log("Pokemon energy updated successfully", updatedPokemon);

    return updatedPokemon;
  } catch (error) {
    console.error("Error updating pokemon energy:", error);
  } finally {
    await prisma.$disconnect();
  }
};
