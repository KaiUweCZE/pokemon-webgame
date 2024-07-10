"use server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "../../prisma";
import { NextApiRequest, NextApiResponse } from "next";

export const refreshSession = async () => {
  const session = await getServerSession();
  if (!session) return;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      pokemons: true,
    },
  });

  if (user) {
    // Update session data
    session.user = {
      ...session.user,
      ...user,
    };

    // Save session
    // Save session logic here depends on your setup
  }
};
