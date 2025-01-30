import NextAuth from "next-auth";
import { z } from "zod";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../prisma";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { Adapter } from "next-auth/adapters";

const authSchema = z.object({
  name: z.string().min(1),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Credentials({
      credentials: {
        name: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        try {
          const parsed = authSchema.safeParse(credentials);
          if (!parsed.success) return null;

          const { name, password } = parsed.data;

          const existingUser = await prisma.user.findUnique({
            where: { name },
            select: {
              id: true,
              name: true,
              password: true,
              chapter: true,
            },
          });

          if (existingUser && existingUser.password) {
            const valid = await bcryptjs.compare(password, existingUser.password);
            if (valid) {
              const { password: _, ...userWithoutPassword } = existingUser;
              return userWithoutPassword;
            }
            return null;
          }

          const hashedPassword = await bcryptjs.hash(password, 12);
          const newUser = await prisma.user.create({
            data: {
              name,
              password: hashedPassword,
            },
            select: {
              id: true,
              name: true,
              chapter: true,
            },
          });

          return {
            id: newUser.id,
            name: newUser.name,
            chapter: newUser.chapter,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Handle initial sign-in
      if (user) {
        token.userId = user.id;
        token.name = user.name;
        token.chapter = user.chapter;
      }

      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      return token;
    },
    async session({ session, token, trigger, newSession }) {
      /* if (trigger === "update") {
        session = newSession;
      }*/
      return {
        ...session,
        user: {
          id: token.userId,
          name: token.name,
          chapter: token.chapter,
        },
      };
    },
  },
  events: {
    async signIn({ user }) {
      console.log("Sign in event:", user);
    },
    async signOut() {
      console.log("Sign out event");
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
