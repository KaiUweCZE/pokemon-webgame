// types/next-auth.d.ts
import "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      chapter: number;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    name: string;
    chapter: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    name?: string | null;
    chapter: number;
  }
}
