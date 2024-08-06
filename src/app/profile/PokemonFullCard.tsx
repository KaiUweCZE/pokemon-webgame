"use client";
import { Pokemon } from "@/types/pokemon";
import { useContext } from "react";
import { ProfileContext } from "./ProfileContext";
import Image from "next/image";
import { generatePokemonImage } from "@/utils/generatePokemonImage";
import HpBar from "@/components/HpBar";
import EnergyBar from "@/components/EnergyBar";
import ExpBar from "@/components/ExpBar";
import { useSession } from "next-auth/react";
import { addPokemonToSix, evolvePokemon, removePokemon } from "./action";
import closeIcon from "@/assets/images/icons/close.svg";
import { pokemonBattleData } from "@/data/pokemonBattleData";
import { prepareToEvolve } from "@/utils/prepareToEvolve";
import { PokemonContext } from "@/contexts/PokemonContext";

interface PokemonProps {
  pokemon: Pokemon;
}

const PokemonFullCard = ({ pokemon }: PokemonProps) => {
  const { data, update } = useSession();
  const context = useContext(ProfileContext);
  const pokemonContext = useContext(PokemonContext);
  const pokemonImage = generatePokemonImage(pokemon.name);
  const evolution = pokemonBattleData.find(
    (poke) => poke.name === pokemon.name
  )?.evolution;

  const user = data?.user;
  const handleAddToSix = async () => {
    console.log("user is: ", user?.name);

    if (user) {
      try {
        const updatedUser = await addPokemonToSix(user.name, pokemon.id);
        console.log("updated user", updatedUser);

        if (updatedUser) {
          await update({
            ...data,
            user: {
              ...data?.user,
              userSix: updatedUser?.userSix,
            },
          });
          context?.setError(false); // Clear error if update is successful
        }
      } catch (error) {
        context?.setMessage("This pokemon is already in your Six");
        context?.setError(true);
        setTimeout(() => {
          context?.setError(false);
        }, 2000);
      }
    }
  };

  const handleDelete = async () => {
    try {
      if (user && !data?.user.userSix.includes(pokemon.id)) {
        const updatedUser = await removePokemon(pokemon.id, user?.name);
        if (updatedUser) {
          await update({
            ...data,
            user: {
              ...data?.user,
              PokemonIds: updatedUser.pokemonIds,
            },
          });
        }
      } else {
        context?.setMessage("You cannot delete pokemon from your six");
        context?.setError(true);
        setTimeout(() => {
          context?.setError(false);
        }, 2000);
      }
    } catch (err) {
      console.error("error occurs while deleting", err);
    }
  };

  const handleEvolvePokemon = async () => {
    if (!evolution) return null;
    if (pokemon.level > evolution?.level) {
      context?.setMessage("It's level is too low");
      context?.setError(true);
      setTimeout(() => {
        context?.setError(false);
      }, 2000);
    } else {
      const newStats = prepareToEvolve(pokemon, evolution.name);
      if (newStats) {
        const evolvedpokemon = await evolvePokemon(pokemon.id, newStats);
        console.log("New Stats: ", newStats, evolvedpokemon);
        /*const pokemons = pokemonContext?.userPokemons;
        if (pokemons) {
          const newPokemons = pokemons.map((poke) =>
            poke.id === pokemon.id ? evolvedpokemon : poke
          ) as Pokemon[];

          pokemonContext.setUserPokemons(newPokemons);
        }*/
      }
    }
  };

  return (
    <div className="full-card">
      <div className="left-side">
        {" "}
        {pokemonImage && (
          <Image src={pokemonImage} alt={`${pokemon.name} image`} width={150} />
        )}
        <h2>{pokemon.name}</h2>
        <ul className="full-card-attacks">
          {pokemon.attacks.map((attack) => (
            <li key={attack}>{attack}</li>
          ))}
        </ul>
      </div>
      <div className="right-side">
        <ul>
          <li>level: {pokemon.level}</li>
          <li>hp: {pokemon.hp}</li>
          <li>energy: {pokemon.energy}</li>
          <li>next level: {pokemon.expToLevel - pokemon.actualExp} exp.</li>
          <li>damage: {pokemon.damage}</li>
          <li>defense: {pokemon.defense}</li>
          <li>speed: {pokemon.speed}</li>
          <li>
            hp:
            <HpBar maximumHp={pokemon.hp} actualHp={pokemon.actualHp} />
          </li>
          <li>
            en:{" "}
            <EnergyBar
              maximumEnergy={pokemon.energy}
              actualEnergy={pokemon.actualEnergy}
            />
          </li>
          <li>
            {" "}
            ex.{" "}
            <ExpBar
              expToLevel={pokemon.expToLevel}
              actualExp={pokemon.actualExp}
            />{" "}
          </li>
        </ul>
      </div>
      <div className="box-buttons">
        <button className="button-primary" onClick={handleAddToSix}>
          To six
        </button>
        <button className="button-primary" onClick={handleDelete}>
          delete
        </button>
        {evolution && (
          <button className="button-primary" onClick={handleEvolvePokemon}>
            evolve
          </button>
        )}
      </div>
      <Image
        className="close"
        src={closeIcon}
        alt="close icon"
        width={16}
        onClick={() => context?.setActive("")}
      />
    </div>
  );
};

export default PokemonFullCard;
