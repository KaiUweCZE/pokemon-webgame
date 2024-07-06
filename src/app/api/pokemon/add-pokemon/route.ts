import { connectToDatabase } from "@/utils/server-helpers";
import prisma from "../../../../../prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { name, pokemonName, pokemonLevel } = await req.json();
    console.log("Attempting to connect to the database...");
    await connectToDatabase();
    console.log("Database connected successfully.");

    const user = await prisma.user.findUnique({
      where: { name: name },
      include: { pokemons: true },
    });

    if (!user) {
      console.log(`User with ID: ${name} not found.`);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newPokemon = await prisma.pokemon.create({
      data: { name: pokemonName, level: pokemonLevel, userId: user.id },
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

    console.log(`User with ID: ${name} fetched successfully.`);
    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  } finally {
    console.log("Disconnecting from the database...");
    await prisma.$disconnect();
    console.log("Disconnected from the database.");
  }
};
