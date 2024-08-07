import { PokemonContext } from "@/contexts/PokemonContext";
import { useContext, useState } from "react";
import { NpcBattleContext } from "./NpcBattleContext";
import { attacksData } from "@/data/attacksData";
import useDamage from "./hooks/useDamage";
import AttackCountdown from "../battle/battle-components/AttackCountdown";

const AttacksList = () => {
  const pokemonContext = useContext(PokemonContext);
  const context = useContext(NpcBattleContext);
  const [time, setTime] = useState(0);
  const { setChange } = useDamage();
  if (!context || !pokemonContext) return null;

  const pokemon = pokemonContext.currentPokemon;
  const setAnimation = context.setAttackAnimation;

  const handleAttack = (attackName: string) => {
    const attack = attacksData.find((attack) => attack.name === attackName);
    if (attack) {
      setTime(attack.recoveryTime);
      setAnimation(true);
      console.log("attack was set", attack.damage);
      context.setAttack(attack);
      console.log("context attack: ", context.attack);

      setChange((prev) => prev + 1);
      setTimeout(() => {
        setAnimation(false);
      }, 800);
    }
  };

  return (
    <ul className="box-attacks">
      {pokemon &&
        pokemon.attacks.map((attack) => (
          <li
            key={attack}
            className="attack-item"
            onClick={() => handleAttack(attack)}
          >
            {attack}
          </li>
        ))}
      <li className="attack-item addons">rest </li>
      <li className="attack-item addons">avoid</li>
      {time > 0 && <AttackCountdown time={time} setTime={setTime} />}
    </ul>
  );
};

export default AttacksList;
