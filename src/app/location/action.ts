"use server";

import { auth } from "@/auth";
import { prisma } from "../../../prisma";
import { LocationName } from "@/types/location";

export const goToLocation = async (location: LocationName) => {
  const session = await auth();

  if (!session?.user?.name) {
    throw new Error("Not authenticated");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { name: session.user.name },
      select: {
        location: true,
        partOfDay: true,
        visitedLocations: true,
      },
    });

    if (!user) {
      throw new Error("Location not found");
    }

    if (user?.partOfDay >= 2) {
      throw new Error("You can't travel anymore today");
    }

    const updatedVisitedLocations = user.visitedLocations.includes(location)
      ? user.visitedLocations
      : [...user.visitedLocations, location];

    const updatedUser = await prisma.user.update({
      where: { name: session.user.name },
      data: {
        location: location,
        partOfDay: user.partOfDay + 1,
        visitedLocations: updatedVisitedLocations,
      },
    });

    return {
      success: true,
      message: `You went to ${location}`,
      data: {
        newLocation: location,
        newPartOfDay: updatedUser.partOfDay,
      },
    };
  } catch (error) {
    console.error("Go to location failed:", error);
    throw error instanceof Error ? error : new Error("Travel failed due to an unexpected error");
  }
};
