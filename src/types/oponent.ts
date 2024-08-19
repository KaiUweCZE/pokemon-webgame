import { oponentPokemon } from "@/data/npcPokemons";
import { StaticImageData } from "next/image";

export interface Oponent {
  id: number;
  name: string;
  message: string;
  img: StaticImageData;
  stadiumTrainer: boolean;
  pokemons: oponentPokemon[] | undefined;
}
