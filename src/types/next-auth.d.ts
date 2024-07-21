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
      badges: number[];
      location: string;
      chapter: number;
      day: number;
      partOfDay: number;
      items: { name: string; count: number }[];
      contacts: string[];
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
    badges: number[];
    items: { name: string; count: number }[];
    contacts: string[];
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
    badges: number[];
    items: { name: string; count: number }[];
    contacts: string[];
  }
}
