"use server";
import prisma from "../../../prisma";
import { connectToDatabase } from "../server-helpers";

export const changeEnergy = async (pokemonId: string, energyCost: number) => {
  try {
    await connectToDatabase();
    console.log("connection to database was successful");

    const pokemon = await prisma.pokemon.findUnique({
      where: { id: pokemonId },
      select: { actualEnergy: true },
    });

    if (!pokemon) {
      console.log(`Pokemon with id ${pokemonId} not found`);
      return null;
    }

    if (pokemon.actualEnergy < energyCost) return null;

    const newEnergy = pokemon.actualEnergy - energyCost;

    const updatedPokemon = await prisma.pokemon.update({
      where: { id: pokemonId },
      data: { actualEnergy: newEnergy },
      select: { actualEnergy: true },
    });
    console.log(
      "Pokemon energy updated successfully",
      updatedPokemon.actualEnergy
    );

    return updatedPokemon.actualEnergy;
  } catch (error) {
    console.error("Error updating pokemon energy:", error);
  } finally {
    await prisma.$disconnect();
  }
};
