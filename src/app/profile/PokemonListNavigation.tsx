import { Pokemon } from "@/types/pokemon";
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";

const pokemonTypes = [
  "all",
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

interface PokemonNavigationProps {
  pokemons: Pokemon[];
  filteredPokemons: Pokemon[];
  setFilteredPokemons: Dispatch<SetStateAction<Pokemon[]>>;
}

const PokemonListNavigation = ({
  filteredPokemons,
  setFilteredPokemons,
  pokemons,
}: PokemonNavigationProps) => {
  const handleSelect = (pokemonType: string) => {
    const filteredList = pokemons.filter((pokemon) =>
      pokemon.type.includes(pokemonType)
    );

    if (pokemonType === "all") {
      setFilteredPokemons(pokemons);
    } else {
      setFilteredPokemons(filteredList);
    }

    console.log(`${pokemonType}: `, filteredPokemons, pokemons);
  };

  const handleFilterByLevel = (pokemonLevel: number) => {
    if (pokemonLevel) {
      const filteredList = pokemons.filter(
        (pokemon) => pokemon.level === pokemonLevel
      );
      setFilteredPokemons(filteredList);
    } else {
      setFilteredPokemons(pokemons);
    }
  };

  // if pokemons change (for example some pokemon is evolved) filteredPokemon will be set to default
  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemons]);

  return (
    <nav className="profile-nav">
      <ul>
        <li>
          <span>type: </span>
          <select
            name="pokemonType"
            id=""
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              handleSelect(e.target.value)
            }
          >
            {pokemonTypes.map((type) => (
              <option className={type} key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </li>
        <li>
          <span>level: </span>
          <input
            type="number"
            name=""
            id=""
            min={1}
            max={100}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFilterByLevel(parseInt(e.target.value))
            }
          />
        </li>
      </ul>
    </nav>
  );
};

export default PokemonListNavigation;
