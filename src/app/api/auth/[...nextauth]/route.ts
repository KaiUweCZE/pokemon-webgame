import { connectToDatabase } from "@/utils/server-helpers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { User, Session, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../prisma";
import bcrypt from "bcrypt";
//import { User } from "@/types/user";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: {
          label: "Username",
          type: "text",
          placeholder: "enter username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "enter password",
        },
      },
      async authorize(credentials, req) {
        console.log("Received credentials:", credentials);
        if (!credentials || !credentials.password) {
          console.log("Credentials or password missing.");
          return null;
        }

        try {
          await connectToDatabase();
          console.log("Database connected");

          const user = await prisma.user.findUnique({
            where: { name: credentials.name },
          });

          console.log("User lookup:", user);

          if (!user?.hashedPassword) {
            console.log("User not found or hashed password missing");
            return null;
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          if (isPasswordCorrect) {
            console.log("Returning user:", {
              username: user.name,
              ...user,
            });
            return user;
          }

          console.log("Password verification result:", isPasswordCorrect);
          return null;
        } catch (error) {
          console.log("Error during authentication:", error);
          return null;
        } finally {
          await prisma.$disconnect();
          console.log("Database connection closed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.profileImg = user.profileImg;
        token.level = user.level;
        token.pokemonIds = user.pokemonIds;
        token.userSix = user.userSix;
        token.location = user.location;
        token.chapter = user.chapter;
        token.day = user.day;
        token.partOfDay = user.partOfDay;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.profileImg = token.profileImg;
      session.user.level = token.level;
      session.user.pokemonIds = token.pokemonIds;
      session.user.userSix = token.userSix;
      session.user.location = token.location;
      session.user.chapter = token.chapter;
      session.user.day = token.day;
      session.user.partOfDay = token.partOfDay;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
