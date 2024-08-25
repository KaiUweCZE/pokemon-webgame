"use server";
import prisma from "../../../../prisma";
import { connectToDatabase } from "../../../utils/server-helpers";
import { PokemonBattle } from "@/types/pokemonBattle";

interface Item {
  name: string;
  count: number;
}

export const catchPokemon = async (
  username: string,
  pokemon: PokemonBattle,
  result: boolean
) => {
  await connectToDatabase();

  try {
    const user = await prisma.user.findUnique({
      where: { name: username },
    });

    if (!user || !user.items) {
      throw new Error("User not found or user has no items");
    }

    let items: Item[] = user.items as unknown as Item[];
    let pokeball = items.find((e) => e.name === "pokeball");

    if (!pokeball || pokeball.count < 1) {
      throw new Error("You don't have enough pokeballs");
    }

    pokeball.count -= 1;

    if (result) {
      const newPokemon = await prisma.pokemon.create({
        data: {
          name: pokemon.name,
          type: pokemon.type,
          level: pokemon.level,
          attacks: pokemon.attacks,
          abilities: pokemon.abilities,
          actualHp: pokemon.actualHp,
          hp: pokemon.hp,
          actualEnergy: pokemon.actualEnergy,
          energy: pokemon.energy,
          damage: pokemon.damage,
          defense: pokemon.defense,
          speed: pokemon.speed,
          userId: user.id,
        },
      });

      const updateUser = await prisma.user.update({
        where: { name: username },
        data: {
          items: items as any,
          pokemonIds: { push: newPokemon.id },
        },
      });

      console.log("new pokemon: ", newPokemon);

      return updateUser;
    } else {
      console.log("catching was not successfull");

      const updateUser = await prisma.user.update({
        where: { name: username },
        data: {
          items: items as any,
        },
      });
      return updateUser;
    }
  } catch (error) {
    console.log("Errors occurs: ", error);
  } finally {
    await prisma.$disconnect();
  }
};
