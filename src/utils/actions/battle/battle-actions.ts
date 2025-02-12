"use server";
import { auth } from "@/auth";
import { prisma } from "../../../../prisma";
import { PokemonUpdateData } from "@/types/pokemon";

export const updateUserPokemon = async (
  pokemonId: string,
  updateData: Partial<PokemonUpdateData>
) => {
  const session = await auth();

  if (!session?.user?.name || !pokemonId) {
    throw new Error("User or pokemon not found");
  }

  try {
    const pokemon = await prisma.pokemon.findUnique({
      where: { id: pokemonId },
    });

    if (!pokemon) {
      throw new Error("Pokemon not found");
    }

    const updatedPokemon = await prisma.pokemon.update({
      where: { id: pokemonId },
      data: updateData,
    });

    console.log("nothing... ?: ", updatedPokemon);
    return updatedPokemon;
  } catch (error) {
    console.error("Failed to update pokemon:", error);
    throw error;
  }
};
