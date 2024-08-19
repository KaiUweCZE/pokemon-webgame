import { useCallback, useContext, useEffect, useState } from "react";
import { NpcBattleContext } from "../NpcBattleContext";
import { PokemonContext } from "@/contexts/PokemonContext";
import { randomAttack } from "@/utils/battle-function/randomAttack";
import { attacksData } from "@/data/attacksData";
import { restAfterAttack } from "@/utils/battle-function/restAfterAttack";
import { makeDamage } from "@/utils/battle-function/makeDamage";
import { getAttacksFromNames } from "@/utils/battle-function/getAttacksFromNames";

const useOpponentBattle = () => {
  const context = useContext(NpcBattleContext);
  const pokemonContext = useContext(PokemonContext);
  const [recoveryTime, setRecoveryTime] = useState(1);

  const performAttack = useCallback(() => {
    if (!context || !pokemonContext) {
      console.log("Battle context or Pokemon context is missing");
      return;
    }
    const opponentPokemon = context.currentOponentPokemon;
    const setOpponentPokemon = context.setCurrentOponentPokemon;
    const userPokemon = pokemonContext.currentPokemon;
    const setUserPokemon = pokemonContext.setCurrentPokemon;

    if (!opponentPokemon || !opponentPokemon.attacks) {
      console.log("Opponent Pokemon or its attacks are missing");
      return;
    }

    // get data about attack
    const attacksNames = opponentPokemon?.attacks;
    const attacks = getAttacksFromNames(attacksNames);

    if (!attacks || attacks.length === 0 || !userPokemon || !opponentPokemon) {
      console.log("Opponent or user Pokemon is missing");
      return;
    }

    console.log("attacks are: ", attacks);

    // randomoize current attack
    const currentAttack = randomAttack(attacks);
    const newEnergy = Math.max(
      0,
      opponentPokemon.actualEnergy - currentAttack.energyCost
    );

    // set new energy after attack
    setOpponentPokemon({ ...opponentPokemon, actualEnergy: newEnergy });

    // trigger attack aniamtion
    context.setOponentAttackAnimation(true);
    context.setOponentAttack(currentAttack);
    // set 1 sec for animation
    setTimeout(() => {
      context.setOponentAttackAnimation(false);
    }, 1000);

    // set time for next attack
    setRecoveryTime(
      restAfterAttack(opponentPokemon.speed, currentAttack.recoveryTime)
    );

    // new hp for user pokemon after attack
    const newHp = makeDamage(
      currentAttack.damage,
      userPokemon?.actualHp,
      userPokemon?.type,
      currentAttack.type,
      opponentPokemon.damage,
      userPokemon?.defense
    );

    if (newHp <= 0) {
      context.setStopBattle(true);
      pokemonContext.setCurrentPokemon({ ...userPokemon, actualHp: 0 });
    } else {
      setUserPokemon({ ...userPokemon, actualHp: newHp });
    }

    console.log(
      `Opponent ${opponentPokemon.name} used ${currentAttack}. Next attack in ${recoveryTime} seconds.`
    );
  }, [context]);

  useEffect(() => {
    if (context?.stopBattle) {
      console.log("Battle has stopped");
      return;
    }

    const interval = setInterval(performAttack, recoveryTime * 1000);
    return () => clearInterval(interval);
  }, [context?.stopBattle, recoveryTime, performAttack]);

  return null;
};

export default useOpponentBattle;
