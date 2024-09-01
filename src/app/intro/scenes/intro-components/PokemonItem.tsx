"use client";
import Image from "next/image";
import { useState } from "react";
import { addPokemon, chapterDone } from "../action";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useRouter } from "next/navigation";
import { generatePokemon } from "@/utils/generatePokemon";
import { pokemonBattleData } from "@/data/pokemonBattleData";
import { addPokemonToSix } from "@/app/profile/action";
import { useSession } from "next-auth/react";
import IntroMovesList from "./IntoMovesList";
import IntroEvolutionsList from "./IntroEvolutionList";
import IntroAboutPokemon from "./IntroAboutPokemon";
import IntroPokemonBox from "./IntroPokemonBox";

interface PokemonItemProps {
  img: string | StaticImport;
  pokemonName: string;
  pokemonDataId: number;
  pokemonInfo: string;
}

const PokemonItem = ({
  img,
  pokemonName,
  pokemonDataId,
  pokemonInfo,
}: PokemonItemProps) => {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data } = useSession();
  const router = useRouter();
  const pokemon = pokemonBattleData.find((p) => p.name === pokemonName);

  if (!data) {
    console.log("context missing");
    throw new Error();
  }
  const username = data.user.name;

  const nextChapter = async () => {
    const updatedUser = await chapterDone(username, 1);
    console.log("chapter is done");
    return updatedUser;
  };

  const handleAddPokemon = async (pokemonDataId: number) => {
    const pokemon = generatePokemon(pokemonDataId, [5, 5]);

    const newUser = await addPokemon({
      username: username,
      attacks: ["tackle", "bite"],
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

    console.log("done");
  };

  const introDone = async () => {
    setLoading(true);
    await handleAddPokemon(pokemonDataId);
    const updatedUser = await nextChapter();
    if (updatedUser) {
      await addPokemonToSix(username, updatedUser.pokemonIds[0]);
    }

    router.push("/profile");
  };

  return (
    <article className={active ? "pokemon-image active" : "pokemon-image"}>
      <Image
        src={img}
        alt="pokemon image"
        width={180}
        height={180}
        onClick={() => setActive(!active)}
      />
      {pokemon && (
        <div className="pokemon-details">
          <IntroPokemonBox
            pokemonName={pokemon.name}
            pokemonTypes={pokemon.type}
          />
          <div className={active ? "text-wrapper open" : "text-wrapper"}>
            <div className="wrapped-text">
              <IntroMovesList />
              <IntroEvolutionsList pokemonName={pokemon.name} />
              <IntroAboutPokemon
                pokemonName={pokemon.name}
                pokemonInfo={pokemonInfo}
              />
            </div>
            {active && (
              <button
                className="button-primary"
                onClick={introDone}
                disabled={loading}
              >
                choose {pokemon?.name}
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default PokemonItem;
