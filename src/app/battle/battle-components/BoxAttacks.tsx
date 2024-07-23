"use client";
import { BattleContext } from "@/contexts/BattleContext";
import { attacksData } from "@/data/attacksData";
import { Pokemon } from "@/types/pokemon";
import { changeEnergy } from "@/utils/battle-function/changeEnergy";
import { restEng } from "@/utils/battle-function/restEng";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import AttackCountdown from "./AttackCountdown";

interface BoxAttacksProps {
  userPokemon: Pokemon;
  setDamage: Dispatch<SetStateAction<number>>;
  setChange: Dispatch<SetStateAction<number>>;
}

const BoxAttacks = ({ userPokemon, setDamage, setChange }: BoxAttacksProps) => {
  const context = useContext(BattleContext);
  const [time, setTime] = useState(0);

  if (!context) {
    throw new Error("context is missing");
  }

  const { setUserPokemon, enemyPokemon } = context;

  // increment pokemon energy
  const incrementEnergy = async (energyCost: number) => {
    if (!context.userPokemon) {
      return null;
    }
    const updatedPokemon = await changeEnergy({
      pokemonId: context.userPokemon?.id,
      energyCost: energyCost,
    });
    console.log("enemy pokemon: ", enemyPokemon);

    return updatedPokemon;
  };

  const handleAttack = async (attackName: string) => {
    // fetch attack data {dmg, energyCost, type of attack}
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

    console.log("attack data: ", attackData.recoveryTime);

    setTime(attackData.recoveryTime);
    if (userPokemon.actualEnergy - attackData?.energyCost < 0) {
      console.log("attack can not be used");
      return null;
    }
    const updatedPokemon = await incrementEnergy(attackData.energyCost);
    // set damage
    setDamage(attackData?.damage);
    // informs about the change
    setChange((prev) => prev + 1);
    if (updatedPokemon) {
      // set change for actual energy
      setUserPokemon({
        ...userPokemon,
        actualEnergy: updatedPokemon.actualEnergy,
      });
    }
  };

  const handleRest = async (pokemonId: string) => {
    setTime(4);
    const updatedPokemon = await restEng(pokemonId);
    if (updatedPokemon) {
      setUserPokemon({
        ...userPokemon,
        actualEnergy: updatedPokemon?.actualEnergy,
      });
    }
    console.log("actual energy: ", updatedPokemon?.actualEnergy);
  };

  return (
    <ul className="box-attacks">
      <li className="attack-item" onClick={() => handleAttack("quick attack")}>
        quick attack
      </li>
      <li className="attack-item" onClick={() => handleAttack("tackle")}>
        tackle
      </li>
      <li className="attack-item" onClick={() => handleAttack("thunder")}>
        thunder
      </li>
      <li className="attack-item" onClick={() => handleAttack("thunderbolt")}>
        thunderbolt
      </li>
      <li className="attack-item" onClick={() => handleRest(userPokemon.id)}>
        rest{" "}
      </li>
      <li className="attack-item">avoid</li>

      {time > 0 && <AttackCountdown time={time} setTime={setTime} />}
    </ul>
  );
};

export default BoxAttacks;
