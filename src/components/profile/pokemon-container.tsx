import { Pokemon } from "@/types/pokemon";
import ProfilePokemonCard from "./profile-pokemon-card";
import ProfilePokemonSearch from "./profile-pokemon-search";
import { GradientBackground } from "../ui/primitives/gradient-background";
import { useProfileStore } from "@/store/profile-store";

interface PokemonContainerProps {
  pokemons: Pokemon[];
}

const PokemonContainer = ({ pokemons }: PokemonContainerProps) => {
  const { filteredPokemons } = useProfileStore();

  const userPokemons = pokemons.filter((pokemon) =>
    filteredPokemons?.some(
      (filteredPokemon) =>
        filteredPokemon.name === pokemon.name && pokemon.level === filteredPokemon.level
    )
  );

  return (
    <section className="pokemon-container primary-shadow h-full rounded-sm border-2 border-purple-300 bg-primary-dark/85">
      <ProfilePokemonSearch pokemons={pokemons} />
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {userPokemons.map((pokemon) => (
          <ProfilePokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      {/* <GradientBackground intensity="max" variant="light" /> */}
    </section>
  );
};

export default PokemonContainer;
