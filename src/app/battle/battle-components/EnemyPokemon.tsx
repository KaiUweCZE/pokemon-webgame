import { PokemonBattle } from "@/types/pokemonBattle";
import Image from "next/image";
import { generatePokemonImage } from "@/utils/generatePokemonImage";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { BattleContext } from "@/contexts/BattleContext";
import Pokeball from "@/components/Pokeball";
import field from "@/assets/images/fields/field2.webp";
import { getClassInBattle } from "../utils/getClassInBattle";
import EnemyPokemonStats from "./EnemyPokemonStats";
import { BattleState } from "@/types/enums/battleState";
import { useGetExp } from "@/hooks/useGetExp";

interface EnemyPokemonProps {
  enemyPokemon: PokemonBattle;
  enemyPokemonState: BattleState;
}

const EnemyPokemon = ({
  enemyPokemon,
  enemyPokemonState,
}: EnemyPokemonProps) => {
  const context = useContext(BattleContext);
  const pokemonImg = useMemo(
    () => generatePokemonImage(enemyPokemon.name),
    [enemyPokemon.name]
  );

  useGetExp(enemyPokemon, enemyPokemonState);

  if (enemyPokemon.actualHp === undefined) {
    return <p>???</p>;
  }

  return (
    <div className={getClassInBattle("oponent", enemyPokemonState)}>
      {(enemyPokemonState === BattleState.CATCHING ||
        enemyPokemonState === BattleState.CAUGHT) && <Pokeball />}
      {context?.attackAnimation && context?.attack && (
        <Image
          className="user-pokemon-attack"
          src={context.attack.img}
          alt="user pokemon attack animation"
          width={130}
        />
      )}
      <Image className="field" src={field} alt="battle field" width={280} />
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
