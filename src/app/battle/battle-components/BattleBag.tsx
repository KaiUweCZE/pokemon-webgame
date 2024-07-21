"use client";
import { BattleContext } from "@/contexts/BattleContext";
import { catchPokemon } from "@/utils/battle-function/catchPokemon";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useContext } from "react";
import BagItem from "./BagItem";

interface BattleBagProps {
  setMenuChoice: Dispatch<SetStateAction<string>>;
}

const BattleBag = ({ setMenuChoice }: BattleBagProps) => {
  const { data } = useSession();
  const context = useContext(BattleContext);
  if (!data) {
    throw new Error("data is missing");
  }

  if (!context) {
    throw new Error("context is missing");
  }

  const user = data.user;

  const { enemyPokemon } = context;
  const handleCatchPokemon = async () => {
    if (enemyPokemon) {
      const updatedUser = await catchPokemon(user.name, enemyPokemon);
      console.log(updatedUser?.pokemonIds[-1]);
    } else {
      console.log("there are not enemy");
    }
  };

  const items = data.user.items;
  return (
    <div className="battle-bag">
      <ul>
        {items.map((item, index) => (
          <BagItem key={index} name={item.name} count={item.count} />
        ))}
      </ul>
      <button className="button-primary" onClick={() => setMenuChoice("")}>
        close
      </button>
    </div>
  );
};

export default BattleBag;
