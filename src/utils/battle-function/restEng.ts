"use server";

import prisma from "../../../prisma";
import { connectToDatabase } from "../server-helpers";

export const restEng = async (pokemonId: string) => {
  try {
    await connectToDatabase();

    const pokemon = await prisma.pokemon.findUnique({
      where: { id: pokemonId },
    });

    if (!pokemon) return null;

    // the number will be different for each pokemon
    let newEnergy = pokemon?.actualEnergy + 5;

    if (newEnergy > pokemon.energy) {
      newEnergy = pokemon.energy;
    }

    const updatePokemon = await prisma.pokemon.update({
      where: { id: pokemonId },
      data: {
        actualEnergy: newEnergy,
      },
    });

    console.log(`updated energy: ${updatePokemon.actualEnergy}`);

    return updatePokemon;
  } catch (error) {
    console.log("error while rest: ", error);
  } finally {
    await prisma.$disconnect();
  }
};
