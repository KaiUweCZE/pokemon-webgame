"use client";
import { BattleContext } from "@/contexts/BattleContext";
import { attacksData } from "@/data/attacksData";
import { Pokemon } from "@/types/pokemon";
import { PokemonBattle } from "@/types/pokemonBattle";
import { changeEnergy } from "@/utils/battle-function/changeEnergy";
import { Dispatch, SetStateAction, useContext } from "react";

interface BoxAttacksProps {
  userPokemon: Pokemon;
  setDamage: Dispatch<SetStateAction<number>>;
  setChange: Dispatch<SetStateAction<number>>;
}

const BoxAttacks = ({ userPokemon, setDamage, setChange }: BoxAttacksProps) => {
  const context = useContext(BattleContext);

  if (!context) {
    throw new Error("context is missing");
  }

  const setUserPokemon = context.setUserPokemon;
  const enemyPokemon = context.enemyPokemon;

  // increment pokemon energy
  const incrementEnergy = async (energyCost: number) => {
    const updatedPokemon = await changeEnergy({
      pokemonId: "668ceccb959eed5c42bc69f9",
      energyCost: energyCost,
    });

    return updatedPokemon;
  };

  const handleAttack = async (attackName: string) => {
    // fetch attack data {dmg, energyCost, type of attack}
    const attackData = attacksData.find((attack) => attack.name === attackName);

    if (!attackData) {
      throw new Error(`${attackName} does not exist`);
    }
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
    </ul>
  );
};

export default BoxAttacks;
