import { connectToDatabase } from "@/utils/server-helpers";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../prisma";
import bcrypt from "bcrypt";

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
              id: user.id,
              username: user.name,
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
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
