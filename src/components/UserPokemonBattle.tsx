import { PokemonBattle } from "@/types/pokemonBattle";
import {
  generatePokemonImage,
  generatePokemonImageBack,
} from "@/utils/generatePokemonImage";
import Image from "next/image";
import HpBar from "./HpBar";
import { Dispatch, SetStateAction } from "react";
import EnergyBar from "./EnergyBar";
import ExpBar from "./ExpBar";
import { Pokemon } from "@/types/pokemon";

interface UserPokemonBattleProps {
  userPokemon: Pokemon;
  setDamage: Dispatch<SetStateAction<number>>;
  setChange: Dispatch<SetStateAction<number>>;
}

const UserPokemonBattle = ({
  userPokemon,
  setDamage,
  setChange,
}: UserPokemonBattleProps) => {
  const img = generatePokemonImage(userPokemon.name);
  const imgBack = generatePokemonImageBack(userPokemon.name);

  return (
    <div className="user-pokemon">
      {imgBack && (
        <Image src={imgBack} alt="user's pokemon" width={160} height={160} />
      )}
      <div className="box-bar">
        <span>{`${userPokemon.name} lvl.${userPokemon.level}`}</span>
        <HpBar maximumHp={userPokemon.hp} actualHp={userPokemon.actualHp} />
        <EnergyBar
          maximumEnergy={userPokemon.energy}
          actualEnergy={userPokemon.actualEnergy}
        />
        <ExpBar
          actualExp={userPokemon.actualExp}
          expToLevel={userPokemon.expToLevel}
        />
      </div>
    </div>
  );
};

export default UserPokemonBattle;
