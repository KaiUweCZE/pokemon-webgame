import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getPokemon } from "./action";
import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import {
  generatePokemonIcon,
  generatePokemonImage,
} from "@/utils/generatePokemonImage";

interface UserSixProps {
  pokemonId: string;
  setActive: Dispatch<SetStateAction<string>>;
  active: string;
}

const UserSix = ({ pokemonId, active, setActive }: UserSixProps) => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const img = pokemon && generatePokemonIcon(pokemon.name);

  useEffect(() => {
    const fetchPokemon = async () => {
      const newPokemon = await getPokemon(pokemonId);
      if (newPokemon) {
        setPokemon(newPokemon);
      }
    };

    fetchPokemon();
  }, [pokemonId]);
  return (
    <>
      <div className="pokemon-from-six">
        {img && (
          <Image
            src={img}
            alt="image of pokemon"
            width={30}
            height={30}
            onClick={() => setActive(pokemonId)}
          />
        )}
      </div>
      <article
        className={
          active === pokemonId ? "about-pokemon active" : "about-pokemon"
        }
      >
        <h3>{pokemon?.name}</h3>
        <ul>
          <li>level: {pokemon?.level}</li>
          <li>hp: {pokemon?.hp}</li>
          <li>damage: {pokemon?.damage}</li>
          <li>defense: {pokemon?.defense}</li>
        </ul>
        <button className="button-primary" onClick={() => setActive("")}>
          close
        </button>
      </article>
    </>
  );
};

export default UserSix;
