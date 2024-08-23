"use client";
import { BattleContext } from "@/contexts/BattleContext";
import { attacksData } from "@/data/attacksData";
import { Pokemon } from "@/types/pokemon";
import { changeEnergy } from "@/utils/battle-function/changeEnergy";
import { restEng } from "@/utils/battle-function/restEng";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import AttackCountdown from "../../../components/battle/AttackCountdown";
import { PokemonContext } from "@/contexts/PokemonContext";
import { restAfterAttack } from "@/utils/battle-function/restAfterAttack";

interface BoxAttacksProps {
  userPokemon: Pokemon;
  setDamage: Dispatch<SetStateAction<number>>;
  setChange: Dispatch<SetStateAction<number>>;
}

const BoxAttacks = ({ userPokemon, setDamage, setChange }: BoxAttacksProps) => {
  const context = useContext(BattleContext);
  const pokemonContext = useContext(PokemonContext);
  const [time, setTime] = useState(0);

  if (!context || !pokemonContext) {
    throw new Error("context is missing");
  }

  const { enemyPokemon } = context;
  const { setCurrentPokemon } = pokemonContext;

  // increment pokemon energy
  const incrementEnergy = async (energyCost: number) => {
    if (!userPokemon) {
      return null;
    }
    const updatedEnergy = await changeEnergy(userPokemon.id, energyCost);
    console.log("enemy pokemon: ", enemyPokemon);

    return updatedEnergy;
  };

  const handleAttack = async (attackName: string) => {
    // fetch attack data {dmg, energyCost, type of attack}
    if (context.stopBattle) {
      console.log("you are done, switch your pokemon", attackName);

      return null;
    }

    const attackData = attacksData.find((attack) => attack.name === attackName);

    if (attackData) {
      context.setAttack(attackData);
    }

    context.setAttackAnimation(true);
    setTimeout(() => {
      context.setAttackAnimation(false);
    }, 1000);
    if (!attackData) {
      throw new Error(`${attackName} does not exist`);
    }

    console.log("attack data are: ", attackData);

    // calculate actual recovary time based pokemon speed and attack recovery time
    setTime(restAfterAttack(userPokemon.speed, attackData.recoveryTime));
    if (userPokemon.actualEnergy - attackData?.energyCost < 0) {
      console.log("attack can not be used");
      return null;
    }
    const newEnergy = await incrementEnergy(attackData.energyCost);
    // set damage
    setDamage(attackData?.damage);
    // informs about the change
    setChange((prev) => prev + 1);
    if (newEnergy) {
      // set change for actual energy
      setCurrentPokemon({
        ...userPokemon,
        actualEnergy: newEnergy,
      });
    }
  };

  const handleRest = async (pokemonId: string) => {
    setTime(4);
    const updatedPokemon = await restEng(pokemonId);
    if (updatedPokemon) {
      setCurrentPokemon({
        ...userPokemon,
        actualEnergy: updatedPokemon?.actualEnergy,
      });
    }
    console.log("actual energy: ", updatedPokemon?.actualEnergy);
  };

  return (
    <ul className="box-attacks">
      {userPokemon.attacks.map((attack, index) => (
        <li key={index} className="attack-item">
          <button
            onClick={() => handleAttack(attack)}
            disabled={context.stopBattle}
          >
            {attack}
          </button>
        </li>
      ))}

      <li className="attack-item addons">
        <button
          onClick={() => handleRest(userPokemon.id)}
          disabled={context.stopBattle}
        >
          rest
        </button>
      </li>
      <li className="attack-item addons">
        <button disabled={context.stopBattle}>avoid</button>
      </li>

      {time > 0 && <AttackCountdown time={time} setTime={setTime} />}
    </ul>
  );
};

export default BoxAttacks;
