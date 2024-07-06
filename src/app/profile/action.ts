"use server";
import { connectToDatabase } from "@/utils/server-helpers";
import prisma from "../../../prisma";

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

    console.log("Pokemons retrieved:", pokemons);
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

export const addPokemonToSix = async (username: string, pokemonId: string) => {
  try {
    await connectToDatabase();

    const user = await prisma.user.findUnique({
      where: { name: username },
    });

    if (
      user?.userSix &&
      user.userSix.length < 6 &&
      !user.userSix.includes(pokemonId)
    ) {
      const updateUser = await prisma.user.update({
        where: { name: username },
        data: {
          userSix: { push: pokemonId },
        },
      });
      return updateUser;
    }
    console.error(
      `error occurs: ${user?.userSix.length} is not valid to adding`
    );
    return null;
  } catch (error) {
    console.error("Error in addPokemonToSix function", error);
    throw new Error("Server error: Unable to add pokemon to user's six");
  } finally {
    await prisma.$disconnect();
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
  } finally {
    await prisma.$disconnect();
  }
};
