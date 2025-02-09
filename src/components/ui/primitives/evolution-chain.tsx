import React from "react";
import rightArrow from "@/images/icons/right.webp";
import Image from "next/image";

interface PokemonImage {
  src: string;
  alt: string;
}

interface EvolutionChainProps {
  pokemonImages: PokemonImage[];
  evolutionLevels: number[];
  className?: string;
  activeStage?: number;
  onPokemonClick?: (stage: number) => void;
}

const EvolutionChain: React.FC<EvolutionChainProps> = ({
  pokemonImages,
  evolutionLevels,
  className = "",
  activeStage,
  onPokemonClick,
}) => {
  // Validate lengths match
  if (pokemonImages.length !== evolutionLevels.length + 1) {
    console.error("Pokemon images length must be equal to evolution levels length + 1");
    return null;
  }

  return (
    <div
      className={`flex items-center justify-center gap-4 ${className}`}
      role="group"
      aria-label="Pokemon evolution chain"
    >
      {pokemonImages.map((pokemon, index) => (
        <React.Fragment key={`evolution-${index}`}>
          <div
            className="relative transition-all duration-300"
            onClick={() => onPokemonClick?.(index)}
            role="button"
            aria-label={`Evolution stage ${index + 1}: ${pokemon.alt}`}
          >
            <Image src={pokemon.src} alt={pokemon.alt} width={80} height={80} className="z-10" />
          </div>

          {/* Evolution Arrow with Level */}
          {index < pokemonImages.length - 1 && (
            <div className="relative grid">
              <span className="absolute text-xs font-semibold text-amber-100/90 drop-shadow-md">
                Lvl
              </span>
              <Image src={rightArrow} alt="Evolution arrow" height={60} />
              {/* Centered Level Text */}
              <span className="absolute bottom-0 left-0 text-xs font-semibold text-amber-100/90 drop-shadow-md">
                {evolutionLevels[index]}
              </span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default EvolutionChain;
