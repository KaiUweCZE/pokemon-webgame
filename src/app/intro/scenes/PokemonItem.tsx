"use client";
import Image from "next/image";
import { useContext, useState } from "react";
import { addPokemon, chapterDone } from "./action";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/UserContext";
import { generatePokemon } from "@/utils/generatePokemon";
import { pokemonBattleData } from "@/data/pokemonBattleData";
import { addPokemonToSix } from "@/app/profile/action";

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
  const context = useContext(UserContext);
  const router = useRouter();
  const pokemon = pokemonBattleData.find((p) => p.name === pokemonName);

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

  const handleAddPokemon = async (pokemonDataId: number) => {
    const pokemon = generatePokemon(pokemonDataId, [5, 5]);
    if (context.currentUser?.name) {
      const newUser = await addPokemon({
        username: context.currentUser?.name,
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
    }
    console.log("done");
  };

  const introDone = async () => {
    await handleAddPokemon(pokemonDataId);
    const updatedUser = await nextChapter();
    if (updatedUser && context.currentUser) {
      context.setCurrentUser(updatedUser);
      await addPokemonToSix(
        context.currentUser?.name,
        updatedUser.pokemonIds[0]
      );
    }

    router.push("/profile");
  };

  return (
    <div className={active ? "pokemon-image active" : "pokemon-image"}>
      <Image
        src={img}
        alt="pokemon image"
        width={180}
        height={180}
        onClick={() => setActive(!active)}
      />
      <div className="pokemon-card">
        <div className="pokemon-box">
          <h3>{pokemon?.name}</h3>
          {pokemon?.type.map((type, index) => (
            <div key={index} className={`type-box ${type}`}>
              {type}
            </div>
          ))}
        </div>

        <div className={active ? "text-wrapper open" : "text-wrapper"}>
          <ul className="wrapped-text">
            <li>
              <ul className="moves-list">
                <li>
                  <span>Moves:</span>
                </li>
                <li>tackle,</li>
                <li>bite</li>
              </ul>
            </li>
            <li>
              <ul className="evolutions-list">
                <li>
                  <span>Evolutions: </span>
                </li>
                {pokemon?.name === "Eevee" && <li>umbreon, espeon</li>}
                {pokemon?.name === "Teddiursa" && <li>ursaring, ursaluna</li>}
              </ul>
            </li>
            <li>
              <ul className="about-pokemon">
                <li>
                  <span>About:</span>
                </li>
                <li>{pokemonInfo}</li>
              </ul>
            </li>
          </ul>
          {active && (
            <button className="button-primary" onClick={introDone}>
              choose {pokemon?.name}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonItem;
