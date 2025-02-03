import { Pokemon } from "@/types/pokemon";
import ProfilePokemonCard from "./profile-pokemon-card";
import ProfilePokemonSearch from "./profile-pokemon-search";

interface PokemonContainerProps {
  pokemons: Pokemon[];
}

const PokemonContainer = ({ pokemons }: PokemonContainerProps) => {
  return (
    <section className="pokemon-container grid w-fit">
      <ProfilePokemonSearch onSearch={() => {}} />
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pokemons.map((pokemon) => (
          <ProfilePokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </section>
  );
};

export default PokemonContainer;
