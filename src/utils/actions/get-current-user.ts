"use server";

import { auth } from "@/auth";
import { prisma } from "../../../prisma";

export async function getCurrentUser() {
  try {
    const session = await auth();

    if (!session?.user?.name) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { name: session.user.name },
      select: {
        id: true,
        name: true,
        email: true,
        profileImg: true,
        level: true,
        badges: true,
        pokemons: true,
        activePokemonIds: true,
        completedQuests: true,
        location: true,
        visitedLocations: true,
        chapter: true,
        day: true,
        partOfDay: true,
        inventory: true,
        contacts: true,
        dailyMessage: true,
        messages: true,
        quests: {
          include: { objectives: true },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return null;
    }

    /*const transformedUser = {
      ...user,
      location: user.location as LocationName,
      visitedLocations: user.visitedLocations as LocationName[],
    } satisfies User;*/

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
