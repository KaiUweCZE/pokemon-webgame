import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { NpcBattleContext } from "../NpcBattleContext";
import { PokemonContext } from "@/contexts/PokemonContext";
import { randomAttack } from "@/utils/battle-function/randomAttack";
import { restAfterAttack } from "@/utils/battle-function/restAfterAttack";
import { makeDamage } from "@/utils/battle-function/makeDamage";
import { getAttacksFromNames } from "@/utils/battle-function/getAttacksFromNames";
import { BattleState } from "@/types/enums/battleState";
import { changeHpServer } from "@/utils/battle-function/changeHpServer";
import OponentImage from "../OponentImage";

const useOpponentBattle = () => {
  const context = useContext(NpcBattleContext);
  const pokemonContext = useContext(PokemonContext);
  const recoveryTimeRef = useRef(1000);
  const timingAdjustmentRef = useRef(50);
  const [lastAttackTime, setLastAttackTime] = useState(Date.now());
  const [isFirstAttack, setIsFirstAttack] = useState(true);

  const performAttack = useCallback(async () => {
    if (!context?.currentOponentPokemon || !pokemonContext?.currentPokemon)
      return;

    const {
      currentOponentPokemon: opponentPokemon,
      setCurrentOponentPokemon: setOpponentPokemon,
    } = context;
    const { currentPokemon: userPokemon, setCurrentPokemon: setUserPokemon } =
      pokemonContext;

    if (!opponentPokemon || !opponentPokemon.attacks) return;

    if (
      context.battleState === BattleState.USER_VICTORY ||
      context.battleState === BattleState.OPPONENT_POKEMON_FAINTED
    ) {
      console.log("Battle has ended. Opponent stops attacking.");
      return;
    }
    // check opponent energy
    console.log("opponent energy: ", opponentPokemon.actualEnergy);
    // get data about attack
    const attacks = getAttacksFromNames(opponentPokemon?.attacks);
    if (!attacks || attacks.length === 0) return;

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
      restAfterAttack(opponentPokemon.speed, currentAttack.recoveryTime) * 1000;

    // new hp for user pokemon after attack
    const newHp = makeDamage(
      currentAttack.damage,
      userPokemon.actualHp,
      userPokemon.type,
      currentAttack.type,
      opponentPokemon.damage,
      userPokemon.defense
    );

    if (newHp <= 0) {
      context.setStopBattle(true);
      context.setBattleState(BattleState.USER_POKEMON_FAINTED);
      setUserPokemon({ ...userPokemon, actualHp: 0 });
      try {
        const updatedPokemon = await changeHpServer(userPokemon.id, newHp);

        if (updatedPokemon) {
          console.log("updatedPokemon hp: ", updatedPokemon.actualHp);
        }
      } catch (error) {
        console.error("error occurs: ", error);
      }
    } else {
      setUserPokemon({ ...userPokemon, actualHp: newHp });
      const newSix = pokemonContext.pokemonsFromSix.map((pokemon) =>
        pokemon.id !== userPokemon.id ? pokemon : userPokemon
      );
      pokemonContext.setPokemonsFromSix(newSix);
      try {
        const updatedPokemon = await changeHpServer(userPokemon.id, newHp);

        if (updatedPokemon) {
          console.log("updatedPokemon hp: ", updatedPokemon.actualHp);
        }
      } catch (error) {
        console.error("error occurs: ", error);
      }
    }
    // set time from last attack
    setLastAttackTime(Date.now());
    setIsFirstAttack(false);
    console.log(
      `Opponent ${opponentPokemon.name} used ${currentAttack}. Next attack in ${
        recoveryTimeRef.current / 1000
      } seconds. opponent speed: ${opponentPokemon.speed}`
    );
  }, [context, pokemonContext]);

  // if the user switches pokemon, the next opponent's attack will be 1.5s after the spawn
  useEffect(() => {
    console.log("what");

    if (context?.battleState === BattleState.USER_SWITCHING_POKEMON) {
      setIsFirstAttack(true);
    }
  }, [context?.battleState]);

  useEffect(() => {
    const isBattleActive = context?.battleState === BattleState.BATTLE;
    if (!isBattleActive) {
      console.log("Battle has stopped");
      return;
    }

    // opponent's first attack will be after 1.5s
    if (isFirstAttack) {
      const firstAttackTimer = setTimeout(() => {
        performAttack();
      }, 1500);

      return () => clearTimeout(firstAttackTimer);
    } else {
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
    }
  }, [context?.setOponentAttack, context?.stopBattle, performAttack]);

  return null;
};

export default useOpponentBattle;
