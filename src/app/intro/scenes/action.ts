"use server";
import { connectToDatabase } from "@/utils/server-helpers";
import prisma from "../../../../prisma";
import { log } from "console";

interface AddPokemonProps {
  username: string;
  pokemonName: string;
  pokemonLevel: number;
  attacks: string[];
  type: string[];
  energy: number;
  hp: number;
  damage: number;
  speed: number;
  defense: number;
  expToLevel: number;
}

interface AddImageProps {
  username: string;
  image: string;
}

export const createPokemon = async (props: AddPokemonProps) => {
  try {
    await connectToDatabase();
    console.log("successfully connected");

    const user = await prisma.user.findUnique({
      where: { name: props.username },
    });

    if (!user) {
      console.log("Error with user");
      return null;
    }

    const newPokemon = await prisma.pokemon.create({
      data: {
        name: props.pokemonName,
        level: props.pokemonLevel,
        attacks: props.attacks,
        type: props.type,
        userId: user.id,
        energy: props.energy,
        actualEnergy: props.energy,
        hp: props.hp,
        actualHp: props.hp,
        speed: props.speed,
        damage: props.damage,
        defense: props.defense,
        expToLevel: props.expToLevel,
        evolutionInformed: false,
      },
    });

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        pokemonIds: {
          push: newPokemon.id,
        },
        pokemons: {
          connect: { id: newPokemon.id },
        },
      },
      include: { pokemons: true },
    });

    console.log(`User with name: ${user} fetched successfully.`);
    return newPokemon;
  } catch (error) {
    console.error("Error in getProfile function:", error);
    throw new Error("Server error: Unable to fetch user profile");
  } finally {
    console.log("Disconnecting from the database...");
    await prisma.$disconnect();
    console.log("Disconnected from the database.");
  }
};

export const initialProfile = async (props: AddImageProps) => {
  try {
    await connectToDatabase();

    const user = await prisma.user.findUnique({
      where: { name: props.username },
    });

    if (!user) return null;

    const initialItems = [
      { name: "coins", count: 100 },
      { name: "pokeball", count: 5 },
    ];

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { profileImg: props.image, items: initialItems },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error in getProfile function:", error);
    throw new Error("Server error: Unable to fetch user profile");
  } finally {
    await prisma.$disconnect();
  }
};

export const chapterDone = async (username: string, chapter: number) => {
  try {
    connectToDatabase();

    if (!chapter || !username) {
      console.log(`chapter ${chapter} or ${username} or both are not defined`);
    }

    const updatedUser = await prisma.user.update({
      where: { name: username },
      data: {
        chapter: chapter,
      },
    });
    console.log(
      `updated user: ${updatedUser}, updated part => chapter: ${chapter}`
    );

    return updatedUser;
  } catch (error) {
    console.error("Error in update chapter function:", error);
    throw new Error("Server error: Unable to update user");
  } finally {
    prisma.$disconnect();
  }
};
