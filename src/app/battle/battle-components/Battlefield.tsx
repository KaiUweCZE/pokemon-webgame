"use client";
import EnemyPokemon from "./EnemyPokemon";
import UserPokemonBattle from "./UserPokemonImage";
import "@/assets/styles/battle-style.css";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import useEnemyBattle from "../hooks/useEnemyBattle";
import useReward from "@/hooks/useReward";
import { BattleContext } from "@/contexts/BattleContext";
import { BattleState } from "@/types/enums/battleState";
import UserBattleInterface from "./UserBattleInterface";
import { useBattleState } from "../hooks/useBattleState";
import useLoadSixToContext from "@/hooks/useLoadSixToContext";
import { PokemonContext } from "@/contexts/PokemonContext";
import { useBattleInit } from "../hooks/useBattleInit";
import { RoundContext } from "../RoundContext";
import useStartBattle from "../hooks/useStartBattle";

interface BattlefieldProps {
  round: number;
  setRound: Dispatch<SetStateAction<number>>;
  location: string;
}

const Battlefield = ({ round, setRound, location }: BattlefieldProps) => {
  const context = useContext(BattleContext);
  const pokemonContext = useContext(PokemonContext);
  const roundContext = useContext(RoundContext);
  const [isLoading, setIsLoading] = useState(true);

  useBattleInit();
  useEnemyBattle();
  useBattleState();
  useLoadSixToContext();
  useStartBattle(location);
  const { items } = useReward();

  if (!context || !pokemonContext) return;

  const { currentPokemon } = pokemonContext;
  const { enemyPokemon } = context;

  const logStates = () => {
    console.log("batle state: ", context.battleState);
  };
  return (
    <>
      <section className="container-battlefield">
        {currentPokemon && <UserPokemonBattle userPokemon={currentPokemon} />}
        {enemyPokemon && (
          <EnemyPokemon
            enemyPokemon={enemyPokemon}
            enemyPokemonState={context?.battleState ?? BattleState.NOT_STARTED}
          />
        )}
        {currentPokemon && (
          <UserBattleInterface
            newLevel={pokemonContext.newLevel}
            menuOption={context?.menuOption}
            setMenuOption={context?.setMenuOption}
            currentPokemon={currentPokemon}
            battleState={
              context?.battleState ?? BattleState.WILD_POKEMON_APPEAR
            }
          />
        )}
      </section>
      {/*<button onClick={logStates}>clicca</button>*/}
    </>
  );
};

export default Battlefield;
