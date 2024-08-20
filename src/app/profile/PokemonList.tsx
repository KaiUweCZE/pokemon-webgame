import UserPokemon from "@/app/profile/UserPokemon";
import { Pokemon } from "@/types/pokemon";
import PokemonListNavigation from "./PokemonListNavigation";
import { useContext, useState } from "react";
import { ProfileContext } from "./ProfileContext";
import PokemonFullCard from "./full-card/PokemonFullCard";
import { PokemonContext } from "@/contexts/PokemonContext";

interface PokemonListProps {
  pokemons: Pokemon[];
}

const PokemonList = ({ pokemons }: PokemonListProps) => {
  const context = useContext(PokemonContext);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>(
    context?.userPokemons ?? []
  );

  if (!context) return null;

  return (
    <section className="profile-pokemons">
      <PokemonListNavigation
        pokemons={context.userPokemons}
        setFilteredPokemons={setFilteredPokemons}
        filteredPokemons={filteredPokemons}
      />
      <div className="pokemon-list">
        {filteredPokemons &&
          filteredPokemons.map((pokemon, index) => (
            <UserPokemon key={index} pokemon={pokemon} />
          ))}
      </div>
    </section>
  );
};

export default PokemonList;
