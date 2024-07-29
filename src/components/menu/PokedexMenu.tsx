import { pokemonsData } from "@/data/pokemonData";
import { useState } from "react";
import Image from "next/image";
import { pokemonBattleData } from "@/data/pokemonBattleData";

const PokedexMenu = () => {
  const pokemons = pokemonsData;
  const filterPokemons = pokemonsData.filter((poke) =>
    pokemonBattleData.some((pokeB) => pokeB.name === poke.name)
  );
  const pokemonI = filterPokemons.find((poke) => poke.Id === "0")?.img;
  const [pokemonImg, setPokemonImg] = useState(pokemonI);

  return (
    <section className="pokedex">
      {pokemonImg && (
        <Image
          src={pokemonImg}
          alt="image of pokemon"
          width={150}
          height={150}
        />
      )}
      <ul>
        {filterPokemons.map((pokemon) => (
          <li
            className="pokedex-item"
            key={pokemon.Id}
            onClick={() => setPokemonImg(pokemon.img)}
          >
            {pokemon.name} {pokemon.Id}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PokedexMenu;
