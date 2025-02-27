import { usePokedexStore } from "@/store/pokedex-store";
import { pokemonsImg } from "@/images";
import { pokemonsData } from "@/data/pokemons/pokemon-data";
import PokemonPokedexCard from "./pokedex-pokemon-card";
import EvolutionChain from "@/components/ui/primitives/evolution-chain";

const PokedexPokemon = () => {
  const { currentPokemon } = usePokedexStore();

  //
  if (!currentPokemon) {
    return (
      <div className="pokedex-pokemon flex h-full flex-col items-center justify-center p-4 text-amber-200/60">
        <span>Vyberte Pokémona pro zobrazení detailů</span>
      </div>
    );
  }

  //
  const hasEvolutionChain =
    currentPokemon.evolutionChain &&
    currentPokemon.evolutionChain.length > 1 &&
    currentPokemon.evolutionLevels;

  //
  let evolutionImages = [];
  let evolutionLevels = [];
  let currentStage = 0;

  if (hasEvolutionChain) {
    //
    evolutionImages = currentPokemon?.evolutionChain?.map((pokemonName, index) => {
      //
      if (pokemonName === currentPokemon.name) {
        currentStage = index;
      }

      return {
        src: pokemonsImg[pokemonName]?.default.src,
        alt: pokemonName,
      };
    });

    //
    evolutionLevels = currentPokemon.evolutionLevels;
  }

  return (
    <section className="pokedex-pokemon p-2">
      <PokemonPokedexCard />

      {/* evolution chain */}
      {hasEvolutionChain && (
        <div className="mt-3 rounded-sm bg-inventory-accent/30 p-3">
          <h4 className="mb-2 text-sm font-medium text-amber-200">Evolutions:</h4>
          <EvolutionChain
            pokemonImages={evolutionImages}
            evolutionLevels={evolutionLevels}
            activeStage={currentStage}
            className="mx-auto"
          />
        </div>
      )}
    </section>
  );
};

export default PokedexPokemon;
