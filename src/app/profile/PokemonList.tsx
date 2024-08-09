import UserPokemon from "@/app/profile/UserPokemon";
import { Pokemon } from "@/types/pokemon";
import PokemonListNavigation from "./PokemonListNavigation";
import { useContext, useState } from "react";
import { ProfileContext } from "./ProfileContext";
import PokemonFullCard from "./PokemonFullCard";
import { PokemonContext } from "@/contexts/PokemonContext";

interface PokemonListProps {
  pokemons: Pokemon[];
}

const PokemonList = ({ pokemons }: PokemonListProps) => {
  const context = useContext(PokemonContext);
  if (!context) return null;
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>(
    context.userPokemons
  );
  //const [active, setActive] = useState("");

  const clicker = () => {
    console.log(context?.userPokemons);
  };
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
            <UserPokemon
              key={index}
              pokemon={pokemon}
              //active={active}
              //setActive={setActive}
            />
          ))}
      </div>
    </section>
  );
};

export default PokemonList;
