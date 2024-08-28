import { pokemonBattleData } from "@/data/pokemonBattleData";
import { PokemonPokedex } from "@/types/pokemonPokedex";
import { Dispatch, SetStateAction, useContext } from "react";
import { PokedexContext } from "./PokedexContext";

interface PokedexListProps {
  setPokemonPokedex: Dispatch<SetStateAction<PokemonPokedex | null>>;
}

const PokedexList = ({ setPokemonPokedex }: PokedexListProps) => {
  const context = useContext(PokedexContext);
  if (!context) return null;
  const sortedPokemons = [...context.pokedexPokemons].sort(
    (a, b) => a.id - b.id
  );

  return (
    <ul className="pokedex-list">
      {sortedPokemons.map((pokemon, index) => (
        <li key={pokemon.id + index} onClick={() => setPokemonPokedex(pokemon)}>
          {pokemon.name} {pokemon.id}
        </li>
      ))}
    </ul>
  );
};

export default PokedexList;

/*
      <li>
        <button onClick={() => console.log(context)}>fagha</button>
      </li>
*/
