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
            className="enemy-attack-animation"
            src={context?.enemyAttack.img}
            alt="gif of enemy attack"
            width={130}
          />
        </div>
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
      <div className="box-stats">
        <div className="name-level">
          <span>{userPokemon.name}</span>
          <span>lv.{userPokemon.level}</span>
        </div>
        <div className="box-bars">
          <div className="bar-wrapper">
            <span>HP</span>
            <HpBar actualHp={userPokemon.actualHp} maximumHp={userPokemon.hp} />
          </div>
          <div className="bar-wrapper">
            <span>EN</span>
            <EnergyBar
              actualEnergy={userPokemon.actualEnergy}
              maximumEnergy={userPokemon.energy}
            />
          </div>
        </div>
        {/*<ExpBar
          actualExp={userPokemon.actualExp}
          expToLevel={userPokemon.expToLevel}
        />*/}
      </div>
    </div>
  );
};

export default UserPokemonBattle;
/*


<div className="box-bars">
  <div className="bar-wrapper">
    <span>EN</span>
    <EnergyBar
      actualEnergy={pokemon.actualEnergy}
      maximumEnergy={pokemon.energy}
    />
  </div>
  {/*<div className="bar-wrapper">
      <span>exp.</span>
      <ExpBar
        expToLevel={pokemon.expToLevel}
        actualExp={pokemon.actualExp}
      />
    </div>*}
</div>
</div>*/
