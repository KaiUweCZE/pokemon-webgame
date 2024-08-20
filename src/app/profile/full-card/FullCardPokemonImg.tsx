import { generatePokemonImage } from "@/utils/generatePokemonImage";
import Image from "next/image";

interface FullCardPokemonImgProps {
  name: string;
  isEvolving: boolean;
}

const FullCardPokemonImg = ({ name, isEvolving }: FullCardPokemonImgProps) => {
  const pokemonImage = generatePokemonImage(name);
  return (
    pokemonImage && (
      <Image
        className={isEvolving ? "evolving" : " "}
        src={pokemonImage}
        alt={`${name} image`}
        width={150}
      />
    )
  );
};

export default FullCardPokemonImg;
