import { Dispatch, SetStateAction, useContext, useState } from "react";
import { getPokemon, removeFromSix } from "./action";
import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import {
  generatePokemonIcon,
  generatePokemonImage,
} from "@/utils/generatePokemonImage";
import { PokemonContext } from "@/contexts/PokemonContext";
import ErrorMessage from "@/components/ErrorMessage";

interface UserSixItemProps {
  username: string;
  pokemon: Pokemon;
  setActive: Dispatch<SetStateAction<string>>;
  active: string;
}

const UserSixItem = ({
  username,
  pokemon,
  active,
  setActive,
}: UserSixItemProps) => {
  const context = useContext(PokemonContext);
  const [error, setError] = useState(false);
  const img = pokemon && generatePokemonIcon(pokemon.name);

  const handleRemoveFromSix = async () => {
    const updatedUser = await removeFromSix(username, pokemon.id);
    console.log("updated user: ", updatedUser?.userSix);
    const newSix = context?.pokemonsFromSix.filter((e) => e.id !== pokemon.id);
    if (updatedUser && newSix) {
      context?.setPokemonsFromSix(newSix);
    } else {
      console.log("it is too dangerous to be without pokemon");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };
  return (
    <>
      <div className="pokemon-from-six">
        {img && (
          <Image
            src={img}
            alt="image of pokemon"
            width={30}
            height={30}
            onClick={() => setActive(pokemon.id)}
          />
        )}
      </div>
      <article
        className={
          active === pokemon.id ? "about-pokemon active" : "about-pokemon"
        }
      >
        <h3>{pokemon?.name}</h3>
        <ul>
          <li>level: {pokemon?.level}</li>
          <li>hp: {pokemon?.hp}</li>
          <li>damage: {pokemon?.damage}</li>
          <li>defense: {pokemon?.defense}</li>
        </ul>
        <div className="box-buttons">
          <button className="button-primary" onClick={() => setActive("")}>
            close
          </button>
          <button className="button-primary red" onClick={handleRemoveFromSix}>
            return
          </button>
        </div>
      </article>
      {error && (
        <ErrorMessage message="it is too dangerous to be without pokemon" />
      )}
    </>
  );
};

export default UserSixItem;
