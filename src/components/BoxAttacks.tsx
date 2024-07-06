import { PokemonBattle } from "@/types/pokemonBattle";
import { Dispatch, SetStateAction } from "react";

interface BoxAttacksProps {
  userPokemon: PokemonBattle;
  setDamage: Dispatch<SetStateAction<number>>;
  setChange: Dispatch<SetStateAction<number>>;
}

const BoxAttacks = ({ userPokemon, setDamage, setChange }: BoxAttacksProps) => {
  const handleAttack = (dmg: number) => {
    setDamage(dmg);
    setChange((prev) => prev + 1);
  };
  return (
    <ul className="box-attacks">
      <li className="attack-item" onClick={() => handleAttack(1)}>
        quick attack
      </li>
      <li className="attack-item" onClick={() => handleAttack(2)}>
        tackle
      </li>
      <li className="attack-item" onClick={() => handleAttack(3)}>
        thunder
      </li>
      <li className="attack-item" onClick={() => handleAttack(4)}>
        thunderbolt
      </li>
    </ul>
  );
};

export default BoxAttacks;
