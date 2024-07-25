import { PokemonBattle } from "@/types/pokemonBattle";
import {
  generatePokemonImage,
  generatePokemonImageBack,
} from "@/utils/generatePokemonImage";
import Image from "next/image";
import HpBar from "../../../components/HpBar";
import { Dispatch, SetStateAction, useContext } from "react";
import EnergyBar from "../../../components/EnergyBar";
import ExpBar from "../../../components/ExpBar";
import { Pokemon } from "@/types/pokemon";
import { EnemyContext } from "../EnemyContext";
import { BattleContext } from "@/contexts/BattleContext";

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
  const context = useContext(BattleContext);

  return (
    <div className="user-pokemon">
      {context?.enemyAttackAnimation && context.enemyAttack && (
        <div className="enemy-attack">
          <Image
            src={context?.enemyAttack.img}
            alt="gif of enemy attack"
            width={130}
          />
        </div>
      )}
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
