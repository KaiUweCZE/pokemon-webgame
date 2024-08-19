import { pokemonBattleData } from "@/data/pokemonBattleData";
import { PokemonPokedex } from "@/types/pokemonPokedex";
import { Dispatch, SetStateAction } from "react";

interface PokedexListProps {
  setPokemonPokedex: Dispatch<SetStateAction<PokemonPokedex | null>>;
}

const PokedexList = ({ setPokemonPokedex }: PokedexListProps) => {
  const filterPokemons = pokemonBattleData.sort((a, b) => a.id - b.id);
  return (
    <ul className="pokedex-list">
      {filterPokemons.map((pokemon, index) => (
        <li key={pokemon.id + index} onClick={() => setPokemonPokedex(pokemon)}>
          {pokemon.name} {pokemon.id}
        </li>
      ))}
    </ul>
  );
};

export default PokedexList;
