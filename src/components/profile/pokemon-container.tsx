import { Pokemon } from "@/types/pokemon";
import ProfilePokemonCard from "./profile-pokemon-card";
import ProfilePokemonSearch from "./profile-pokemon-search";
import { GradientBackground } from "../ui/primitives/gradient-background";

interface PokemonContainerProps {
  pokemons: Pokemon[];
}

const PokemonContainer = ({ pokemons }: PokemonContainerProps) => {
  return (
    <section className="pokemon-container primary-shadow h-full rounded-sm border-2 border-purple-300 bg-primary-dark/85">
      <ProfilePokemonSearch />
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {pokemons.map((pokemon) => (
          <ProfilePokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      {/* <GradientBackground intensity="max" variant="light" /> */}
    </section>
  );
};

export default PokemonContainer;
