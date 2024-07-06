export interface User {
  id: string;
  name: string;
  hashedPassword: string | null;
  profileImg: string | null;
  level: number;
  pokemonIds: string[];
  userSix: string[];
  location: string;
  day: number;
  partOfDay: number;
  chapter: number;
}
