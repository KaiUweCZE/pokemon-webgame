"use server";
import { auth } from "@/auth";
import { PokemonCreate } from "@/types/pokemon";
import { prisma } from "../../../prisma";

const MAX_TEAM_SIZE = 6;

const canAddToTeam = (currentTeamSize: number): boolean => {
  return currentTeamSize < MAX_TEAM_SIZE;
};

export const addPokemon = async (pokemonData: PokemonCreate) => {
  const session = await auth();

  if (!session?.user?.name || !session?.user?.id) {
    throw new Error("Not authenticated");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { name: session.user.name },
      select: {
        activePokemonIds: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const canAdd = canAddToTeam(user.activePokemonIds.length);

    const newPokemon = await prisma.pokemon.create({
      data: {
        name: pokemonData.name,
        types: pokemonData.types,
        attacks: pokemonData.attacks ?? ["tackle"],
        shiny: pokemonData.shiny ?? false,
        abilities: pokemonData.abilities ?? [],
        level: pokemonData.level ?? 1,
        maxHp: pokemonData.maxHp,
        currentHp: pokemonData.maxHp,
        maxEnergy: pokemonData.maxEnergy,
        currentEnergy: pokemonData.maxEnergy,
        damage: pokemonData.damage ?? 1,
        defense: pokemonData.defense ?? 1,
        speed: pokemonData.speed ?? 1,
        currentExp: 0,
        expToNextLevel: pokemonData.expToNextLevel ?? 100,
        userId: session.user.id,
        // it is not necessary to have this field, but it is useful for the UI
        isActive: canAdd,
        createdAt: new Date(),
      },
    });

    if (canAdd) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          activePokemonIds: {
            push: newPokemon.id,
          },
        },
      });
    }

    return { success: true, pokemon: newPokemon };
  } catch (error) {
    console.error("Failed to add Pokémon:", error);
    throw error instanceof Error ? error : new Error("Failed to add Pokémon");
  }
};
