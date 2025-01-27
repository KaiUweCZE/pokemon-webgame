import NextAuth from "next-auth";
import { z } from "zod";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../prisma";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";

const authSchema = z.object({
  name: z.string().min(1),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        name: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        try {
          // Validate input
          const parsed = authSchema.safeParse(credentials);
          if (!parsed.success) return null;

          const { name, password } = parsed.data;
          // Find user by name
          const existingUser = await prisma.user.findUnique({
            where: { name },
          });

          if (existingUser) {
            const valid = await bcryptjs.compare(password, existingUser.password);
            return valid ? existingUser : null;
          }

          const hashedPassword = await bcryptjs.hash(password, 12);

          // Verify password
          const newUser = await prisma.user.create({
            data: {
              name,
              password: hashedPassword,
            },
          });

          return {
            id: newUser.id,
            name: newUser.name,
            //email: newUser.email,
          };
        } catch (error) {
          console.log("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
