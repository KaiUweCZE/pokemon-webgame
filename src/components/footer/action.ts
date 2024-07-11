"use server";
import { connectToDatabase } from "@/utils/server-helpers";
import prisma from "../../../prisma";
import { refreshSession } from "@/utils/refreshSession";
import { NextApiRequest, NextApiResponse } from "next";

export const nextDay = async (username: string) => {
  try {
    connectToDatabase();

    if (!username) {
      return null;
    }

    const updatedUser = await prisma.user.update({
      where: { name: username },
      data: {
        day: {
          increment: 1,
        },
        partOfDay: 0,
      },
    });

    const pokemons = await prisma.pokemon.findMany({
      where: { userId: updatedUser.id },
    });
    console.log("day is succesfully updated");

    const updatedPokemons = pokemons.map((pokemon) =>
      prisma.pokemon.update({
        where: { id: pokemon.id },
        data: {
          actualHp: pokemon.hp,
          actualEnergy: pokemon.energy,
        },
      })
    );

    await Promise.all(updatedPokemons);

    console.log(`updated user: ${updatedUser.day}`);

    return updatedUser;
  } catch (error) {
    console.error("Error updating user day:", error);
  } finally {
    prisma.$disconnect();
  }
};
