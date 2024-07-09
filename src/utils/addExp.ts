"use server";
import prisma from "../../prisma";
import { connectToDatabase } from "./server-helpers";

interface AddExpRequest {
  pokemonId: string;
  newExps: number;
}

export const addExp = async ({ pokemonId, newExps }: AddExpRequest) => {
  try {
    await connectToDatabase();

    const pokemon = await prisma.pokemon.findUnique({
      where: { id: pokemonId },
    });

    if (!pokemon) {
      console.log("pokemon does not exist");
      return null;
    }

    let remainingExps = pokemon.actualExp + newExps;
    let newLevel = pokemon.level;
    let expToNextLevel = pokemon.expToLevel;
    let newDamage;
    let newSpeed;
    let newHp;
    let newEnergy;
    let newDefense;

    while (remainingExps >= expToNextLevel) {
      remainingExps -= expToNextLevel;
      newLevel += 1;
      newDamage = parseFloat((pokemon.damage * 1.05).toFixed(2)) + 1;
      newDefense = parseFloat((pokemon.defense * 1.05).toFixed(2)) + 1;
      newHp = parseFloat((pokemon.hp * 1.05).toFixed(2)) + 1;
      newSpeed = parseFloat((pokemon.speed * 1.05).toFixed(2)) + 1;
      newEnergy = pokemon.energy + 2;
      expToNextLevel = Math.floor(expToNextLevel * 1.5);
    }

    const updatedPokemon = await prisma.pokemon.update({
      where: { id: pokemonId },
      data: {
        level: newLevel,
        actualExp: remainingExps,
        expToLevel: expToNextLevel,
        defense: newDefense,
        damage: newDamage,
        hp: newHp,
        speed: newSpeed,
        energy: newEnergy,
      },
    });

    console.log("new exps was successfully added");
    return updatedPokemon;
  } catch (error) {
    console.error("error occurs", error);
  } finally {
    await prisma.$disconnect();
  }
};
