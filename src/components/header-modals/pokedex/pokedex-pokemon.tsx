import { usePokedexStore } from "@/store/pokedex-store";
import { pokemonsImg } from "@/images";
import { pokemonsData } from "@/data/pokemons/pokemon-data";
import PokemonPokedexCard from "./pokedex-pokemon-card";
import EvolutionChain from "@/components/ui/primitives/evolution-chain";
import { StaticImageData } from "next/image";

type EvolutionImageType = {
  src: string | StaticImageData;
  alt: string;
};

const PokedexPokemon = () => {
  const { currentPokemon } = usePokedexStore();
  let evolutionImages: EvolutionImageType[] | undefined = undefined;
  let evolutionLevels: number[] | null | undefined = undefined;
  let currentStage = 0;

  const hasEvolutionChain = Boolean(
    currentPokemon.evolutionChain &&
      currentPokemon.evolutionChain.length > 1 &&
      currentPokemon.evolutionLevels
  );

  if (hasEvolutionChain) {
    evolutionImages = currentPokemon?.evolutionChain?.map((pokemonName, index) => {
      if (pokemonName === currentPokemon.name) {
        currentStage = index;
      }

      return {
        src: pokemonsImg[pokemonName]?.default.src,
        alt: pokemonName,
        width: 52,
        height: 52,
      };
    });

    evolutionLevels = currentPokemon.evolutionLevels;
  }

  return (
    <section className="pokedex-pokemon p-2">
      <PokemonPokedexCard />

      {/* evolution chain */}
      {hasEvolutionChain && (
        <div className="grid rounded-sm bg-inventory-accent/30 p-2">
          <h4 className="text-sm font-medium text-amber-200">Evolutions:</h4>

          {evolutionImages && evolutionLevels && (
            <EvolutionChain
              pokemonImages={evolutionImages}
              evolutionLevels={evolutionLevels}
              activeStage={currentStage}
              arrowHeight={50}
              className="mx-auto"
            />
          )}
        </div>
      )}
    </section>
  );
};

export default PokedexPokemon;
