import { Button } from "@/components/ui/primitives/button";
import { PokemonImages } from "@/types/image";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface PokemonCardIntroProps {
  name: string;
  description: string;
  pokemonImages: PokemonImages;
  onSelect: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const PokemonCardIntro = ({
  name,
  description,
  pokemonImages,
  isLoading,
  onSelect,
  disabled,
}: PokemonCardIntroProps) => {
  return (
    <div className="pokemon-card-intro">
      <Image
        src={pokemonImages.default.src}
        alt={pokemonImages.default.alt}
        className="pick-pokemon"
        width={150}
        height={150}
      />
      <article className="pokemon-details">
        <h3>{name}</h3>
        <p>{description}</p>
        <Button
          variant="basic"
          className="mt-4 gap-2"
          onClick={onSelect}
          disabled={disabled}
          isLoading={isLoading}
          leftIcon={isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : ""}
        >
          <span>{isLoading ? "Loading..." : `Choose ${name}`}</span>
        </Button>
      </article>
    </div>
  );
};
