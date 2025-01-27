import { StaticImageData } from "next/image";

export interface ImageAsset {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
}

export interface PokemonImages {
  default: ImageAsset;
  back: ImageAsset;
  icon: ImageAsset;
}
