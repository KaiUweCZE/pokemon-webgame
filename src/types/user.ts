export interface User {
  id: string;
  name: string;
  profileImg: string | null;
  level: number;
  pokemonIds: string[];
  badges: number[];
  userSix: string[];
  location: string;
  day: number;
  partOfDay: number;
  chapter: number;
}
