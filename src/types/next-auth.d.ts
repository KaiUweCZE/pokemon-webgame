import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      profileImg: string | null;
      level: number;
      pokemonIds: string[];
      userSix: string[];
      location: string;
      chapter: number;
      day: number;
      partOfDay: number;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    profileImg: string | null;
    level: number;
    pokemonIds: string[];
    userSix: string[];
    location: string;
    chapter: number;
    day: number;
    partOfDay: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    profileImg: string | null;
    level: number;
    pokemonIds: string[];
    userSix: string[];
    location: string;
    chapter: number;
    day: number;
    partOfDay: number;
  }
}
