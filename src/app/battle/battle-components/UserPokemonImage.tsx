import { generatePokemonImageBack } from "@/utils/generatePokemonImage";
import Image from "next/image";
import { useContext } from "react";
import { Pokemon } from "@/types/pokemon";
import { BattleContext } from "@/contexts/BattleContext";
import UserPokemonStats from "./UserPokemonStats";
import { getClassInBattle } from "../utils/getClassInBattle";
import { BattleState } from "@/types/enums/battleState";
import SwitchPokemonImage from "@/components/battlestate-images/SwitchPokemonImage";

interface UserPokemonBattleProps {
  userPokemon: Pokemon;
}

const UserPokemonImage = ({ userPokemon }: UserPokemonBattleProps) => {
  const imgBack = generatePokemonImageBack(userPokemon.name);
  const context = useContext(BattleContext);

  return (
    <div
      className={getClassInBattle(
        "user-pokemon",
        context?.battleState ?? BattleState.BATTLE_STOPPED
      )}
    >
      {context?.enemyAttackAnimation && context.enemyAttack && (
        <Image
          className="enemy-attack"
          src={context?.enemyAttack.img}
          alt="gif of enemy attack"
          width={130}
        />
      )}
      {imgBack && (
        <>
          <Image
            className="user-pokemon-image"
            src={imgBack}
            alt="user's pokemon"
            width={170}
            height={170}
          />
          {context?.battleState === BattleState.USER_SWITCHING_POKEMON && (
            <SwitchPokemonImage />
          )}
        </>
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

export default UserPokemonImage;
