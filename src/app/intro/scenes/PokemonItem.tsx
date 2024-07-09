"use client";
import Image from "next/image";
import { useContext, useState } from "react";
import { addPokemon, chapterDone } from "./action";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/UserContext";
import { generatePokemon } from "@/utils/generatePokemon";

interface PokemonItemProps {
  img: string | StaticImport;
  pokemonName: string;
  pokemonDataId: number;
  pokemonInfro: string;
}

const PokemonItem = (props: PokemonItemProps) => {
  const [active, setActive] = useState({ index: 0, active: false });
  const context = useContext(UserContext);
  const router = useRouter();

  if (!context) {
    console.log("context missing");
    throw new Error();
  }

  const nextChapter = async () => {
    if (context.currentUser?.name) {
      const updatedUser = await chapterDone(context.currentUser.name, 1);
      console.log("chapter is done");
      return updatedUser;
    }

    console.log("error occurs");
  };

  const handleAddPokemon = async (
    pokemonName: string,
    pokemonDataId: number
  ) => {
    const pokemon = generatePokemon(pokemonDataId);
    if (context.currentUser?.name) {
      const newUser = await addPokemon({
        username: context.currentUser?.name,
        pokemonName: pokemon.name,
        pokemonLevel: 5,
        type: pokemon.type,
        hp: pokemon.hp,
        defense: pokemon.defense,
        damage: pokemon.damage,
        speed: pokemon.speed,
        energy: pokemon.energy,
        expToLevel: pokemon.expToLevel,
      });
      console.log(newUser);
    }
    console.log("done");
  };

  const introDone = async (pokemonName: string) => {
    await handleAddPokemon(pokemonName, props.pokemonDataId);
    const updatedUser = await nextChapter();
    if (updatedUser) {
      context.setCurrentUser(updatedUser);
    }

    router.push("/profile");
  };

  return (
    <div className="pokemon-image">
      <Image
        src={props.img}
        alt="pokemon image"
        width={180}
        height={180}
        onClick={() => introDone(props.pokemonName)}
      />
      <article className="pokemon-info">
        <div className="pokemon-box">
          <h3>{props.pokemonName}</h3>
          <button
            className="button-primary"
            onClick={() => setActive({ index: 0, active: !active.active })}
          >
            more about
          </button>
        </div>
      </article>
      <div
        className={
          active.active && active.index === 0
            ? "text-wrapper open"
            : "text-wrapper"
        }
      >
        <p className="wrapped-text">{props.pokemonInfro}</p>
      </div>
    </div>
  );
};

export default PokemonItem;
