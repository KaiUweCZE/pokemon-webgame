"use server";
import prisma from "../../../prisma";
import { connectToDatabase } from "../server-helpers";

export const updateEliminateQuests = async (
  userId: string,
  defeatedPokemonName: string
) => {
  try {
    await connectToDatabase();

    const quests = await prisma.quest.findMany({
      where: { userId: userId },
      include: { objectives: true },
    });

    if (!quests || quests.length === 0) {
      console.log("No quests found for the user");
      return;
    }

    const updatedQuests = await Promise.all(
      quests.map(async (quest) => {
        const updatedObjectives = quest.objectives.map((objective) => {
          if (
            objective.type === "eliminatePokemon" &&
            objective.target.toLowerCase() ===
              defeatedPokemonName.toLowerCase() &&
            objective.currentAmount < objective.requiredAmount
          ) {
            return {
              ...objective,
              currentAmount: objective.currentAmount + 1,
              completed:
                objective.currentAmount + 1 >= objective.requiredAmount,
            };
          }
          return objective;
        });

        const allObjectivesCompleted = updatedObjectives.every(
          (obj) => obj.completed
        );

        // Aktualizujeme quest v databázi
        const updatedQuest = await prisma.quest.update({
          where: { id: quest.id },
          data: {
            completed: allObjectivesCompleted,
            objectives: {
              updateMany: updatedObjectives.map((objective) => ({
                where: { id: objective.id },
                data: {
                  currentAmount: objective.currentAmount,
                  completed: objective.completed,
                },
              })),
            },
          },
          include: { objectives: true },
        });

        return updatedQuest;
      })
    );

    console.log("Quests updated successfully");
    return updatedQuests;
  } catch (error) {
    console.error("An error occured while updating quests", error);
  } finally {
    await prisma.$disconnect();
  }
};
