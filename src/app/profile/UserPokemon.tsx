import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import { addPokemonToSix, removePokemon } from "./action";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { generatePokemonImage } from "@/utils/generatePokemonImage";
import HpBar from "@/components/HpBar";
import EnergyBar from "@/components/EnergyBar";
import ErrorMessage from "@/components/ErrorMessage";
import { generatePokemonTypes } from "@/utils/generatePokemonTypes";
import { useSession } from "next-auth/react";
import PokemonFullCard from "./PokemonFullCard";
import { ProfileContext } from "./ProfileContext";

interface ActiveType {
  index: string;
  isActive: boolean;
}

interface UserPokemonProps {
  pokemon: Pokemon;
  //active: string;
  //setActive: Dispatch<SetStateAction<string>>;
}

const UserPokemon: React.FC<UserPokemonProps> = ({
  pokemon,
}: UserPokemonProps) => {
  const { data } = useSession();
  const context = useContext(ProfileContext);
  const img = generatePokemonImage(pokemon.name);

  const user = data?.user;

  const handleActive = () => {
    context?.setActive(pokemon.id);
    context?.setProfilePokemon(pokemon);
    console.log("profile pokemon: ", pokemon);
  };

  return (
    <>
      <div className="pokemon-box">
        {img && (
          <Image
            src={img}
            alt={`${pokemon.name} image`}
            width={100}
            height={100}
          />
        )}

        {
          <ul className="profile-pokemon-info">
            <li>
              {pokemon.name} lvl. {pokemon.level}
            </li>
            <ul className="types">
              {pokemon.type &&
                pokemon.type.map((type, index) => (
                  <li key={index} className={`pokemon-type ${type}`}>
                    {type}
                  </li>
                ))}
            </ul>

            <li>
              hp: <HpBar maximumHp={pokemon.hp} actualHp={pokemon.actualHp} />
            </li>
            <li>
              en:{" "}
              <EnergyBar
                maximumEnergy={pokemon.energy}
                actualEnergy={pokemon.actualEnergy}
              />
            </li>
            <li className="li-buttons">
              <button className="button-primary" onClick={handleActive}>
                detail
              </button>
            </li>
          </ul>
        }
        {data?.user.userSix.includes(pokemon.id) && (
          <div className="sticker">6</div>
        )}
      </div>{" "}
      {context?.error && <ErrorMessage message={context.message} />}
    </>
  );
};

export default UserPokemon;
