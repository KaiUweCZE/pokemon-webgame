import { useContext, useEffect, useState } from "react";
import { PokedexContext } from "./PokedexContext";
import { pokemonBattleData } from "@/data/pokemonBattleData";
import { mapData } from "@/app/map/mapData";

enum SearchType {
  NAME = "NAME",
  TYPE = "TYPE",
  LOCATION = "LOCATION",
}

const pokemonTypes = [
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Dark",
  "Steel",
  "Fairy",
];

const locationTypes = [
  "shire",
  "large farm",
  "mountains",
  "cave",
  "bridge",
  "lovely",
  "willy's barn",
  "lake",
  "deep mine",
  "gastly tower",
  "magical forest",
  "ice scream",
  "waterfalls",
  "monastry",
  "northmandic",
  "teleport",
  "chatot castle",
  "jungle",
  "macho pichu",
  "redwoods",
  "yummy desert",
  "safari",
  "swamp",
  "futurome",
  "southam",
];

const PokedexSearchBar = () => {
  const context = useContext(PokedexContext);
  const allPokemons = pokemonBattleData;
  const locationData = mapData.map((loc) => loc.name);
  const [searchType, setSearchType] = useState<SearchType>(SearchType.NAME);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    handleSearch();
  }, [searchType, searchValue]);

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value as SearchType);
    setSearchValue("");
  };

  const handleSearchValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    if (!context) return;
    let filteredPokemons = context?.pokedexPokemons;
    switch (searchType) {
      case SearchType.NAME:
        filteredPokemons = allPokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        console.log(searchValue, filteredPokemons);
        break;
      case SearchType.TYPE:
        filteredPokemons = allPokemons.filter((pokemon) =>
          pokemon.type.some((type) =>
            type.toLowerCase().includes(searchValue.toLowerCase())
          )
        );
        break;
      case SearchType.LOCATION:
        console.log(locationData);

        const pokemonsInLocation = mapData.find(
          (loc) => loc.name === searchValue
        )?.completePokemonList;

        filteredPokemons = allPokemons.filter((pokemon) =>
          pokemonsInLocation?.includes(pokemon.id)
        );
        break;
    }

    context.setPokedexPokemons(filteredPokemons);
  };

  return (
    <form className="pokedex-search-bar">
      <select value={searchType} onChange={handleSearchTypeChange}>
        <option value={SearchType.NAME}>name</option>
        <option value={SearchType.TYPE}>type</option>
        <option value={SearchType.LOCATION}>location</option>
      </select>
      {searchType === SearchType.NAME && (
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchValueChange}
        />
      )}
      {searchType === SearchType.TYPE && (
        <select value={searchValue} onChange={handleSearchValueChange}>
          <option value="">Select type</option>
          {pokemonTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      )}
      {searchType === SearchType.LOCATION && (
        <select value={searchValue} onChange={handleSearchValueChange}>
          <option value="">Select location</option>
          {locationTypes.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      )}
    </form>
  );
};

export default PokedexSearchBar;
