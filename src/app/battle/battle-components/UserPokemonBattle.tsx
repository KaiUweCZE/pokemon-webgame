import { generatePokemonImageBack } from "@/utils/generatePokemonImage";
import Image from "next/image";
import { Dispatch, SetStateAction, useContext } from "react";
import { Pokemon } from "@/types/pokemon";
import { BattleContext } from "@/contexts/BattleContext";
import UserPokemonStats from "./UserPokemonStats";

interface UserPokemonBattleProps {
  userPokemon: Pokemon;
}

const UserPokemonBattle = ({ userPokemon }: UserPokemonBattleProps) => {
  const imgBack = generatePokemonImageBack(userPokemon.name);
  const context = useContext(BattleContext);

  return (
    <div className="user-pokemon">
      {context?.enemyAttackAnimation && context.enemyAttack && (
        <Image
          className="enemy-attack"
          src={context?.enemyAttack.img}
          alt="gif of enemy attack"
          width={130}
        />
      )}
      {imgBack && (
        <Image
          className="user-image"
          src={imgBack}
          alt="user's pokemon"
          width={170}
          height={170}
        />
      )}
      <UserPokemonStats
        name={userPokemon.name}
        level={userPokemon.level}
        hp={userPokemon.hp}
        actualHp={userPokemon.actualHp}
        energy={userPokemon.energy}
        actualEnergy={userPokemon.actualEnergy}
        actualExp={userPokemon.actualExp}
        expToLevel={userPokemon.expToLevel}
      />
    </div>
  );
};

export default UserPokemonBattle;
