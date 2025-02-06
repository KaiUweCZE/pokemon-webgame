import { Button } from "@/components/ui/primitives/button";
import { capitalize } from "@/utils/string";
import { Loader2 } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { GradientBackground } from "../ui/primitives/gradient-background";

interface PokemonCardIntroProps {
  name: string;
  description: string;
  pokemonImg: StaticImageData;
  alt: string;
  onSelect: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const PokemonCardIntro = ({
  name,
  description,
  pokemonImg,
  alt,
  isLoading,
  onSelect,
  disabled,
}: PokemonCardIntroProps) => {
  return (
    <div className="pokemon-card-intro">
      <Image
        className="pick-pokemon z-10"
        src={pokemonImg}
        alt={alt}
        width={150}
        height={150}
        placeholder="blur"
      />
      <article className="pokemon-details border-l-4 border-r-[3px] border-element/70 border-r-element/50 bg-element/60">
        <h3 className="mx-auto text-lg font-medium text-amber-100">{capitalize(name)}</h3>
        <p className="text-sm text-amber-50">{description}</p>
        <Button
          variant="primary"
          className="z-1 mx-auto mt-4 gap-2 transition duration-500 hover:bg-white/10"
          onClick={onSelect}
          disabled={disabled}
          isLoading={isLoading}
          leftIcon={isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : ""}
        >
          <span>{isLoading ? "Loading..." : `Choose ${name}`}</span>
        </Button>
        <GradientBackground
          variant="dark"
          intensity="high"
          direction="radial"
          pattern="dots"
          patternIntensity="medium"
        />
      </article>
    </div>
  );
};
