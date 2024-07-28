import UserPokemon from "@/app/profile/UserPokemon";
import { Pokemon } from "@/types/pokemon";
import PokemonListNavigation from "./PokemonListNavigation";
import { useContext, useState } from "react";
import { ProfileContext } from "./ProfileContext";
import PokemonFullCard from "./PokemonFullCard";

interface PokemonListProps {
  pokemons: Pokemon[];
}

const PokemonList = ({ pokemons }: PokemonListProps) => {
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>(pokemons);
  //const [active, setActive] = useState("");
  const context = useContext(ProfileContext);
  const clicker = () => {
    console.log(pokemons);
  };
  return (
    <section className="profile-pokemons">
      <PokemonListNavigation
        pokemons={pokemons}
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
