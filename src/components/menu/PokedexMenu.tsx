import { pokemonsData } from "@/data/pokemonData";
import { useState } from "react";
import Image from "next/image";

const PokedexMenu = () => {
  const pokemons = pokemonsData;
  const pokemonI = pokemonsData.find((poke) => poke.Id === "0")?.img;
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
        {pokemons.map((pokemon) => (
          <li
            className="pokedex-item"
            key={pokemon.Id}
            onClick={() => setPokemonImg(pokemon.img)}
          >
            {pokemon.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PokedexMenu;
