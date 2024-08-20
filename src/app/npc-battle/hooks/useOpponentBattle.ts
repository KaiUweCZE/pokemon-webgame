import { useCallback, useContext, useEffect, useRef, useState } from "react";
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
  const recoveryTimeRef = useRef(1000);
  const timingAdjustmentRef = useRef(50);
  const [lastAttackTime, setLastAttackTime] = useState(Date.now());

  const performAttack = useCallback(() => {
    if (!context || !pokemonContext) return;

    const opponentPokemon = context.currentOponentPokemon;
    const setOpponentPokemon = context.setCurrentOponentPokemon;
    const userPokemon = pokemonContext.currentPokemon;
    const setUserPokemon = pokemonContext.setCurrentPokemon;

    if (!opponentPokemon || !opponentPokemon.attacks) return;

    // get data about attack
    const attacksNames = opponentPokemon?.attacks;
    const attacks = getAttacksFromNames(attacksNames);

    if (!attacks || attacks.length === 0 || !userPokemon || !opponentPokemon)
      return;

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
    recoveryTimeRef.current =
      restAfterAttack(opponentPokemon.speed / 100, currentAttack.recoveryTime) *
      1000;

    // new hp for user pokemon after attack
    const newHp = makeDamage(
      currentAttack.damage / 100,
      userPokemon?.actualHp,
      userPokemon?.type,
      currentAttack.type,
      opponentPokemon.damage / 100,
      userPokemon?.defense
    );

    if (newHp <= 0) {
      context.setStopBattle(true);
      pokemonContext.setCurrentPokemon({ ...userPokemon, actualHp: 0 });
    } else {
      setUserPokemon({ ...userPokemon, actualHp: newHp });
    }
    // set time from last attack
    setLastAttackTime(Date.now());
    console.log(
      `Opponent ${opponentPokemon.name} used ${currentAttack}. Next attack in ${
        recoveryTimeRef.current / 1000
      } seconds. opponent speed: ${opponentPokemon.speed}`
    );
  }, [context, pokemonContext]);

  useEffect(() => {
    if (context?.stopBattle) {
      console.log("Battle has stopped");
      return;
    }
    // check every 0.1s if recovery time has passed
    const interval = setInterval(() => {
      const now = Date.now();
      // round (now - lastAttackTime)
      // usage interval check that now - lastAttackTime === 45ms, with added -50 we
      if (
        now - lastAttackTime - timingAdjustmentRef.current >=
        recoveryTimeRef.current
      ) {
        // Reduce the timing adjustment, but keep it non-negative
        /*
        e.g. with 10 attacks the opponent could be at an advantage of up to .5s, gradually reducing the rounding advantage
         */
        timingAdjustmentRef.current = Math.max(
          0,
          timingAdjustmentRef.current - 5
        );
        performAttack();
      }
    }, 100);
    return () => clearInterval(interval);
  }, [context?.setOponentAttack, context?.stopBattle, performAttack]);

  return null;
};

export default useOpponentBattle;
