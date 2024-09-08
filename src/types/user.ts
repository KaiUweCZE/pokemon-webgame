import { UserSixEntry } from "./next-auth";

export interface User {
  id: string;
  name: string;
  profileImg: string | null;
  level: number;
  pokemonIds: string[];
  badges: number[];
  userSix: UserSixEntry[];
  location: string;
  day: number;
  partOfDay: number;
  chapter: number;
  items: { name: string; count: number }[];
  contacts: string[];
}
