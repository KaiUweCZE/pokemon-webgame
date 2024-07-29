import { pokemonsData } from "@/data/pokemonData";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { pokemonBattleData } from "@/data/pokemonBattleData";
import { findLocationOfPokemon } from "@/utils/pokedex-functions/findLocationOfPokemon";
import { link } from "fs";

/*
(parameter) pokemon: {
    id: number;
    name: string;
    img: StaticImageData;
    imgBack: StaticImageData;
    icon: StaticImageData;
    type: string[];
    attacks: {
        level: number;
        attacks: string[];
    }[];
    ... 6 more ...;
    expForKill: number;
}
*/
interface PokemonPokedex {
  id: number;
  name: string;
  img: StaticImageData;
  icon: StaticImageData;
  imgBack: StaticImageData;
  type: string[];
  attacks: {
    level: number;
    attacks: string[];
  }[];
  hp: number;
  damage: number;
  defense: number;
  speed: number;
  energy: number;
}

const PokedexMenu = () => {
  const filterPokemons = pokemonBattleData.sort((a, b) => a.id - b.id);
  const [pokemonPokedex, setPokemonPokedex] = useState<PokemonPokedex | null>(
    null
  );
  const locations = findLocationOfPokemon(pokemonPokedex?.id ?? 0);

  return (
    <div className="pokedex-wrap">
      <h2>Pokedex</h2>
      <section className="pokedex">
        {pokemonPokedex && (
          <div className="pokedex-pokemon">
            {pokemonPokedex?.img && (
              <Image
                src={pokemonPokedex.img}
                alt="image of pokemon"
                width={150}
                height={150}
              />
            )}
            <div className="pokedex-pokemon-info">
              <ul className="pokedex-base-info">
                <li>{pokemonPokedex?.name}</li>
                <ul className="base-info-types">
                  {pokemonPokedex?.type.map((type) => (
                    <li key={type} className={type}>
                      {type}
                    </li>
                  ))}
                </ul>
                <li>hp: {pokemonPokedex?.hp}</li>
                <li>energy: {pokemonPokedex?.energy}</li>
                <li>speed: {pokemonPokedex?.speed}</li>
                <li>damage: {pokemonPokedex?.damage}</li>
                <li>defense: {pokemonPokedex?.defense}</li>
              </ul>
            </div>
            <ul className="pokedex-location">
              {locations?.length > 0 ? (
                <>
                  <li>locations: </li>
                  {locations.map((location) => (
                    <li key={location.id}>{location.name}</li>
                  ))}
                </>
              ) : (
                <li>no area</li>
              )}
            </ul>
          </div>
        )}
        <ul className="pokedex-list">
          {filterPokemons.map((pokemon) => (
            <li key={pokemon.id} onClick={() => setPokemonPokedex(pokemon)}>
              {pokemon.name} {pokemon.id}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default PokedexMenu;
