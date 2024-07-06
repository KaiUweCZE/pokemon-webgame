import { PokemonBattle } from "@/types/pokemonBattle";
import {
  generatePokemonImage,
  generatePokemonImageBack,
} from "@/utils/generatePokemonImage";
import Image from "next/image";
import HpBar from "./HpBar";
import { Dispatch, SetStateAction } from "react";
import EnergyBar from "./EnergyBar";

interface UserPokemonBattleProps {
  userPokemon: PokemonBattle;
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
        <span>{userPokemon.name}</span>
        <HpBar maximumHp={userPokemon.hp} actualHp={userPokemon.actualHp} />
        <EnergyBar maximumEnergy={100} actualEnergy={65} />
      </div>
    </div>
  );
};

export default UserPokemonBattle;
