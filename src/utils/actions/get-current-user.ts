"use server";

import { auth } from "@/auth";
import { prisma } from "../../../prisma";

export async function getCurrentUser() {
  const session = await auth();

  console.log("getCurrentUser - session:", session);

  if (!session?.user?.name) {
    console.log("getCurrentUser - no user in session");
    return null;
  }

  try {
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
        quests: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    console.log("getCurrentUser - found user:", user);
    if (user) {
      await prisma.$disconnect();
    } else {
      await prisma.$disconnect();
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
