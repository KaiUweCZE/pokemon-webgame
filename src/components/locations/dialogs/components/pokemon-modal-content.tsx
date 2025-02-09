import React from "react";
import Image from "next/image";
import { pokemonsImg } from "@/images";
import { PokemonName, PokemonType } from "@/types/pokemon";
import ElementType from "@/components/ui/primitives/element-type";
import EvolutionChain from "@/components/ui/primitives/evolution-chain";
import { pokemonsData } from "@/data/pokemons/pokemon-data";

interface PokemonModalContentProps {
  pokemon: (typeof pokemonsData)[0];
}

const PokemonModalContent: React.FC<PokemonModalContentProps> = ({ pokemon }) => {
  // Prepare evolution chain data
  const evolutionImages =
    pokemon.evolutionChain?.map((name) => ({
      src: pokemonsImg[name].default.src,
      alt: name,
    })) || [];

  const evolutionLevels = pokemon.evolutionLevels || [];

  // Find current evolution stage
  const currentStage = pokemon.evolutionChain?.findIndex((name) => name === pokemon.name) || 0;

  return (
    <div className="grid gap-6">
      {/* Header with Pokemon Info */}
      <div className="flex items-center gap-4">
        <Image
          src={pokemonsImg[pokemon.name].default.src}
          alt={pokemonsImg[pokemon.name].default.alt}
          width={64}
          height={64}
          className="object-contain"
        />
        <div className="grid gap-2">
          <h3 className="text-xl font-medium capitalize text-primary-text">{pokemon.name}</h3>
          <div className="flex items-center gap-2">
            {pokemon.type.map((type) => (
              <ElementType key={type} variant={type as PokemonType} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4 rounded-lg bg-primary/5 p-4">
        <div className="text-center">
          <div className="text-sm text-secondary-text">HP</div>
          <div className="text-lg font-medium text-primary-text">{pokemon.hp}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-secondary-text">Attack</div>
          <div className="text-lg font-medium text-primary-text">{pokemon.damage}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-secondary-text">Defense</div>
          <div className="text-lg font-medium text-primary-text">{pokemon.defense}</div>
        </div>
      </div>

      {/* Evolution Chain */}
      {pokemon.evolutionChain && (
        <div className="grid gap-2">
          <h4 className="text-sm font-medium text-secondary-text">Evolution Chain</h4>
          <EvolutionChain
            pokemonImages={evolutionImages}
            evolutionLevels={evolutionLevels}
            activeStage={currentStage}
            className="rounded-lg bg-primary/5 p-4"
          />
        </div>
      )}
    </div>
  );
};

export default PokemonModalContent;
