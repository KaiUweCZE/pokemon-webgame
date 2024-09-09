import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

interface UserSixEntry {
  pokemonId: string;
  order: number;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      profileImg: string | null;
      level: number;
      pokemonIds: string[];
      userSix: { pokemonId: string; order: number }[];
      badges: number[];
      location: string;
      visitedLocations: string[];
      chapter: number;
      day: number;
      partOfDay: number;
      items: { name: string; count: number }[];
      contacts: string[];
      dailyMessage: number;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    profileImg: string | null;
    level: number;
    pokemonIds: string[];
    userSix: { pokemonId: string; order: number }[];
    location: string;
    visitedLocations: string[];
    chapter: number;
    day: number;
    partOfDay: number;
    badges: number[];
    items: { name: string; count: number }[];
    contacts: string[];
    dailyMessage: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    profileImg: string | null;
    level: number;
    pokemonIds: string[];
    userSix: { pokemonId: string; order: number }[];
    location: string;
    visitedLocations: string[];
    chapter: number;
    day: number;
    partOfDay: number;
    badges: number[];
    items: { name: string; count: number }[];
    contacts: string[];
    dailyMessage: number;
  }
}
