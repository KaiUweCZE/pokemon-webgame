import { PokemonContext } from "@/contexts/PokemonContext";
import { useContext } from "react";
import { NpcBattleContext } from "./NpcBattleContext";
import { attacksData } from "@/data/attacksData";
import useDamage from "./hooks/useDamage";

const AttacksList = () => {
  const pokemonContext = useContext(PokemonContext);
  const context = useContext(NpcBattleContext);
  const { setChange } = useDamage();
  if (!context || !pokemonContext) return null;

  const pokemon = pokemonContext.currentPokemon;

  const animation = context.attackAnimation;
  const setAnimation = context.setAttackAnimation;

  const handleAttack = (attackName: string) => {
    const attack = attacksData.find((attack) => attack.name === attackName);
    if (attack) {
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
    </ul>
  );
};

export default AttacksList;
