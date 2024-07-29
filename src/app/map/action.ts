"use server";
import { connectToDatabase } from "@/utils/server-helpers";
import prisma from "../../../prisma";

export const changeLocation = async (username: string, newLocation: string) => {
  try {
    await connectToDatabase();

    const user = await prisma.user.findUnique({
      where: { name: username },
    });

    if (!user) {
      console.log("user is missing");
      return null;
    }

    if (user.partOfDay >= 3) {
      return { error: "You must wait until the next day" };
    }

    const updateUser = await prisma.user.update({
      where: {
        name: username,
      },
      data: {
        location: newLocation,
        partOfDay: {
          increment: 1,
        },
      },
    });

    if (!updateUser) {
      console.log("error occured while updating the user");

      return null;
    }

    console.log("updated user location is: ", updateUser.location);

    return updateUser;
  } catch (error) {
    console.log("error: ", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const healUserSix = async (username: string) => {
  try {
    await connectToDatabase();

    const user = await prisma.user.findUnique({
      where: { name: username },
      select: { userSix: true, partOfDay: true },
    });

    const userSix = user?.userSix;

    if (user?.partOfDay === 3) {
      console.log("User cannot heal Pokémon as partOfDay is 3.");
      return null;
    }

    if (!userSix) return null;

    const pokemonToUpdate = await prisma.pokemon.findMany({
      where: { id: { in: userSix } },
    });

    const updatePromises = pokemonToUpdate.map((pokemon) => {
      return prisma.pokemon
        .update({
          where: { id: pokemon.id },
          data: {
            actualHp: pokemon.hp,
            actualEnergy: pokemon.energy,
          },
        })
        .then((updatedPokemon) => {
          console.log("pokemon is updated: ", updatedPokemon);
          return updatedPokemon;
        });
    });

    const updatedPokemons = await Promise.all(updatePromises);

    const updatedUser = await prisma.user.update({
      where: { name: username },
      data: {
        partOfDay: { increment: 1 },
      },
    });

    return { updatedUser, updatedPokemons };
  } catch (error) {
    console.error("error occurs: ", error);
  } finally {
    await prisma.$disconnect();
  }
};
