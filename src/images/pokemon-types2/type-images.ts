import { PokemonType } from "@/types/pokemon";
import normalImage from "@/images/pokemon-types2/normal.webp";
import fireImage from "@/images/pokemon-types2/fire.webp";
import waterImage from "@/images/pokemon-types2/water.webp";
import electricImage from "@/images/pokemon-types2/electric.webp";
import grassImage from "@/images/pokemon-types2/grass.webp";
import iceImage from "@/images/pokemon-types2/ice.webp";
import fightingImage from "@/images/pokemon-types2/fighting.webp";
import poisonImage from "@/images/pokemon-types2/poison.webp";
import groundImage from "@/images/pokemon-types2/ground.webp";
import flyingImage from "@/images/pokemon-types2/flying.webp";
import psychicImage from "@/images/pokemon-types2/psychic.webp";
import bugImage from "@/images/pokemon-types2/bug.webp";
import rockImage from "@/images/pokemon-types2/rock.webp";
import ghostImage from "@/images/pokemon-types2/ghost.webp";
import dragonImage from "@/images/pokemon-types2/dragon.webp";
import darkImage from "@/images/pokemon-types2/dark.webp";
import steelImage from "@/images/pokemon-types2/steel.webp";
import fairyImage from "@/images/pokemon-types2/fairy.webp";
import { StaticImageData } from "next/image";

export const typeImages: Record<PokemonType, { src: StaticImageData; alt: string }> = {
  normal: { src: normalImage, alt: "normal type" },
  fire: { src: fireImage, alt: "fire type" },
  water: { src: waterImage, alt: "water type" },
  electric: { src: electricImage, alt: "electric type" },
  grass: { src: grassImage, alt: "grass type" },
  ice: { src: iceImage, alt: "ice type" },
  fighting: { src: fightingImage, alt: "fighting type" },
  poison: { src: poisonImage, alt: "poison type" },
  ground: { src: groundImage, alt: "ground type" },
  flying: { src: flyingImage, alt: "flying type" },
  psychic: { src: psychicImage, alt: "psychic type" },
  bug: { src: bugImage, alt: "bug type" },
  rock: { src: rockImage, alt: "rock type" },
  ghost: { src: ghostImage, alt: "ghost type" },
  dragon: { src: dragonImage, alt: "dragon type" },
  dark: { src: darkImage, alt: "dark type" },
  steel: { src: steelImage, alt: "steel type" },
  fairy: { src: fairyImage, alt: "fairy type" },
};
