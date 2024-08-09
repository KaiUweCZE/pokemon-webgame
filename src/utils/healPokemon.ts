"use server";

import { Item } from "@/types/item";
import prisma from "../../prisma";
import { connectToDatabase } from "./server-helpers";
import { Prisma } from "@prisma/client";

export const healPokemon = async (
  pokemonId: string,
  addHp: number,
  potionType: string
) => {
  try {
    await connectToDatabase();

    const pokemon = await prisma.pokemon.findUnique({
      where: { id: pokemonId },
      select: { id: true, hp: true, actualHp: true, userId: true },
    });

    if (!pokemon || !pokemon.userId) return null;

    const user = await prisma.user.findUnique({
      where: { id: pokemon.userId },
    });

    if (!user) return null;

    const items = user?.items as unknown as Item[];
    const potion = items.find((item) => item.name === potionType);

    if (!potion || potion.count <= 0) {
      console.log(`User doesn't have any ${potionType} left`);
      return null;
    }

    const updatedItems = items.map((item) =>
      item.name === potionType ? { ...item, count: item.count - 1 } : item
    );

    // check if new hp will not higher than max. hp, else return max. hp
    let newHp = Math.min(pokemon.hp, pokemon.actualHp + addHp);

    const [updatedPokemon, updatedUser] = await prisma.$transaction([
      prisma.pokemon.update({
        where: { id: pokemon.id },
        data: { actualHp: newHp },
      }),
      prisma.user.update({
        where: { id: pokemon.userId },
        data: { items: updatedItems as unknown as Prisma.JsonArray },
      }),
    ]);

    console.log(
      "Successful update: ",
      updatedPokemon.id,
      updatedPokemon.actualHp,
      updatedPokemon.hp
    );

    return { updatedPokemon, updatedUser };
  } catch (error) {
    console.error("Failed to heal pokemon:", error);
  } finally {
    await prisma.$disconnect();
  }
};
