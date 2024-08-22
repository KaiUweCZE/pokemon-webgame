import { PokemonBattle } from "@/types/pokemonBattle";
import HpBar from "../../../components/HpBar";
import Image from "next/image";
import { generatePokemonImage } from "@/utils/generatePokemonImage";
import React, { useContext, useMemo } from "react";
import { BattleContext } from "@/contexts/BattleContext";
import Pokeball from "@/components/Pokeball";
import EnemyPokemonStats from "./EnemyPokemonStats";
import field from "@/assets/images/fields/field2.webp";

enum EnemyPokemonState {
  Done = "oponent done",
  Catching = "oponent catching",
  Caught = "oponent catched",
  Damaged = "oponent damage",
  Default = "oponent",
}

interface EnemyPokemonProps {
  enemyPokemon: PokemonBattle;
}

const EnemyPokemon = ({ enemyPokemon }: EnemyPokemonProps) => {
  const context = useContext(BattleContext);
  const pokemonImg = useMemo(
    () => generatePokemonImage(enemyPokemon.name),
    [enemyPokemon.name]
  );

  const getClassName = (): EnemyPokemonState => {
    if (enemyPokemon.actualHp === 0) return EnemyPokemonState.Done;
    if (context?.isCatching.underway) return EnemyPokemonState.Catching;
    if (context?.isCatching.isSucces) return EnemyPokemonState.Caught;
    if (context?.attackAnimation) return EnemyPokemonState.Damaged;
    return EnemyPokemonState.Default;
  };

  if (enemyPokemon.actualHp === undefined) {
    return <p>???</p>;
  }

  return (
    <div className={getClassName()}>
      {(context?.isCatching.underway || context?.isCatching.isSucces) && (
        <Pokeball />
      )}
      {context?.attackAnimation && context?.attack && (
        <Image
          className="user-pokemon-attack"
          src={context.attack.img}
          alt="user pokemon attack animation"
          width={130}
        />
      )}
      {<Image className="field" src={field} alt="battle field" width={280} />}
      {pokemonImg && (
        <Image
          className="oponent-pokemon"
          src={pokemonImg}
          alt="enemy pokemon"
          width={150}
          height={150}
        />
      )}
      <EnemyPokemonStats
        name={enemyPokemon.name}
        level={enemyPokemon.level}
        hp={enemyPokemon.hp}
        actualHp={enemyPokemon.actualHp}
      />
    </div>
  );
};

export default React.memo(EnemyPokemon);
