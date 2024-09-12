"use server";
import { connectToDatabase } from "@/utils/server-helpers";
import prisma from "../../../prisma";

interface UserSixEntry {
  pokemonId: string;
  order: number;
}

export const getProfile = async (username: string) => {
  if (!username) {
    throw new Error("Username is required");
  }

  try {
    console.log("Attempting to connect to the database...");
    await connectToDatabase();
    console.log("Database connected successfully.");

    console.log(`Fetching user with name: ${username} from the database...`);
    const user = await prisma.user.findUnique({
      where: { name: username },
    });

    if (!user) {
      console.log(`User with name: ${username} not found.`);
      return { error: "User not found" }; // Return a custom error object/message if you prefer
    }

    console.log(`User with name: ${user} fetched successfully.`);
    return user;
  } catch (error) {
    console.error("Error in getProfile function:", error);
    throw new Error("Server error: Unable to fetch user profile");
  } finally {
    console.log("Disconnecting from the database...");
    await prisma.$disconnect();
    console.log("Disconnected from the database.");
  }
};

export const getUserPokemons = async (userId: string) => {
  try {
    console.log("trying to connect to database");
    await connectToDatabase();
    console.log("succesfful connect to database");

    const pokemons = await prisma.pokemon.findMany({
      where: { userId: userId },
    });

    console.log(
      "Pokemons retrieved:",
      pokemons.map((p) => p.name)
    );
    return pokemons;
  } catch (error) {
    console.error("Error in getUserPokemons function:", error);
    throw new Error("Server error: Unable to fetch user profile");
  } finally {
    console.log("Disconnecting from the database...");
    await prisma.$disconnect();
    console.log("Disconnected from the database.");
  }
};

export const getPokemon = async (pokemonId: string) => {
  try {
    await connectToDatabase();

    const pokemon = await prisma.pokemon.findUnique({
      where: { id: pokemonId },
    });

    if (!pokemon) {
      console.error("pokemon is not found");
      return null;
    }

    return pokemon;
  } catch (error) {
    console.error("Error fetching user's pokemon add pokemon to six:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const addPokemonToSix = async (username: string, pokemonId: string) => {
  try {
    await connectToDatabase();

    const user = await prisma.user.findUnique({
      where: { name: username },
      select: { userSix: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    let userSix = user.userSix as { pokemonId: string; order: number }[];

    if (userSix.length >= 6) {
      throw new Error("User's six is already full");
    }

    if (userSix.some((entry) => entry.pokemonId === pokemonId)) {
      throw new Error("Pokemon is already in the user's six");
    }

    userSix.push({ pokemonId: pokemonId, order: userSix.length });

    const updatedUser = await prisma.user.update({
      where: { name: username },
      data: {
        userSix: userSix,
      },
    });

    console.log("pokemon is successfully add to six: ", pokemonId);

    return updatedUser;
  } catch (error) {
    console.error("Error in addPokemonToSix function", error);
    throw new Error("Server error: Unable to add pokemon to user's six");
  } finally {
    await prisma.$disconnect();
  }
};

export const removeFromSix = async (username: string, pokemonId: string) => {
  try {
    connectToDatabase();

    const user = await prisma.user.findUnique({
      where: { name: username },
      select: { userSix: true },
    });

    if (!user) return null;

    let userSix = user.userSix as { pokemonId: string; order: number }[];

    if (userSix.length <= 1) return null;

    const newSix = userSix
      .filter((entry) => entry.pokemonId !== pokemonId)
      .map((entry, index) => ({ ...entry, order: index }));

    const updatedUser = await prisma.user.update({
      where: { name: username },
      data: {
        userSix: newSix,
      },
    });

    return updatedUser;
  } catch (error) {
    console.log("Error occurs: ", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const changeOrderInUserSix = async () => {};

export const removePokemon = async (pokemonId: string, username: string) => {
  try {
    await connectToDatabase();

    // Start a transaction to ensure both operations succeed or fail together
    const result = await prisma.$transaction(async (prisma) => {
      const deletedPokemon = await prisma.pokemon.delete({
        where: { id: pokemonId },
      });

      const user = await prisma.user.findUnique({
        where: { name: username },
        select: { pokemonIds: true },
      });

      if (!user) return null;

      const updatedPokemonIds = user.pokemonIds.filter(
        (id) => id !== pokemonId
      );
      const updatedUser = await prisma.user.update({
        where: { name: username },
        data: {
          pokemonIds: updatedPokemonIds,
        },
      });

      return { deletedPokemon, updatedUser };
    });

    return result?.updatedUser;
  } catch (error) {
    console.log("error occurs: ", error);
  } finally {
    await prisma.$disconnect();
  }
};

interface EvolutionStats {
  name: string;
  hp: number;
  energy: number;
  type: string[];
  speed: number;
  damage: number;
  defense: number;
  expToLevel: number;
}

export const evolvePokemon = async (
  pokemonId: string,
  evolution: EvolutionStats
) => {
  try {
    connectToDatabase();

    const pokemon = await prisma.pokemon.findUnique({
      where: { id: pokemonId },
    });

    console.log("This pokemon: ", pokemon);

    /* name: newBaseStats.name,
    expToLevel: newBaseStats.expToLevel * pokemon.level,
  };*/

    const updatedPokemon = await prisma.pokemon.update({
      where: { id: pokemonId },
      data: {
        name: evolution.name,
        hp: evolution.hp,
        energy: evolution.energy,
        type: evolution.type,
        speed: evolution.speed,
        damage: evolution.damage,
        defense: evolution.defense,
        expToLevel: evolution.expToLevel,
      },
    });

    console.log("new Pokemon: ", updatedPokemon);

    return updatedPokemon;
  } catch (error) {
    console.log("error occurs: ", error);
  } finally {
    await prisma.$disconnect();
  }
};
