import { Dispatch, SetStateAction, useContext, useState } from "react";
import { removeFromSix } from "./action";
import Image from "next/image";
import { generatePokemonIcon } from "@/utils/generatePokemonImage";
import { PokemonContext, PokemonWithOrder } from "@/contexts/PokemonContext";
import ErrorMessage from "@/components/ErrorMessage";
import { useClickOutside } from "@/hooks/useClickOutside";
import closeIcon from "@/assets/images/icons/close.svg";

interface UserSixItemProps {
  username: string;
  pokemon: PokemonWithOrder;
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
  const [open, setOpen] = useState(false);

  const { isVisible } = useClickOutside(setOpen, open, ".about-pokemon");

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
            width={28}
            height={28}
            onClick={() => {
              setActive(pokemon.id);
              setOpen(true);
            }}
          />
        )}
      </div>
      {isVisible && (
        <article
          className={
            active === pokemon.id && isVisible
              ? "about-pokemon active"
              : "about-pokemon"
          }
        >
          <Image
            src={closeIcon}
            className="close-article"
            alt="close icon"
            width={16}
            height={16}
            onClick={() => setActive("")}
          />
          <h3>
            {pokemon.order + 1}. {pokemon?.name}
          </h3>
          <ul>
            <li>level: {pokemon.level}</li>
            <li>actualHp: {pokemon.actualHp}</li>
            <li>hp: {pokemon.hp}</li>
            <li>damage: {pokemon.damage}</li>
            <li>defense: {pokemon.defense}</li>
          </ul>
          <div className="box-buttons">
            <button
              className="button-primary"
              onClick={() => context?.setPokemonFirst(pokemon.id)}
            >
              first in battle
            </button>
            <button
              className="button-primary red"
              onClick={handleRemoveFromSix}
            >
              return to box
            </button>
          </div>
        </article>
      )}
      {error && (
        <ErrorMessage message="it is too dangerous to be without pokemon" />
      )}
    </>
  );
};

export default UserSixItem;
