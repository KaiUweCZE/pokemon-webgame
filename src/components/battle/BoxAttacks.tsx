import { PokemonContext } from "@/contexts/PokemonContext";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { attacksData } from "@/data/attacksData";
import useDamage from "@/app/npc-battle/hooks/useDamage";
import AttackCountdown from "./AttackCountdown";
import { restAfterAttack } from "@/utils/battle-function/restAfterAttack";
import { BattleState } from "@/types/enums/battleState";
import { useBattleContext } from "@/hooks/useBattleContext";

const BoxAttacks = () => {
  const pokemonContext = useContext(PokemonContext);
  const context = useBattleContext();
  const [time, setTime] = useState(0);
  if (!context || !pokemonContext) return null;

  const pokemon = pokemonContext.currentPokemon;
  const setAnimation = context.setAttackAnimation;

  const handleAttack = (attackName: string) => {
    const attack = attacksData.find((attack) => attack.name === attackName);
    if (
      attack &&
      pokemon?.speed &&
      context.battleState === BattleState.BATTLE
    ) {
      setTime(restAfterAttack(pokemon.speed, attack.recoveryTime));
      setAnimation(true);
      console.log("attack was set", attack.damage);
      context.setAttack(attack);
      console.log("context attack: ", context.attack);

      context.setChange((prev) => prev + 1);
      setTimeout(() => {
        setAnimation(false);
      }, 800);
    }
  };

  return (
    <ul className="box-attacks">
      {pokemon &&
        pokemon.attacks.map((attack) => (
          <li key={attack} className="attack-item">
            <button
              onClick={() => handleAttack(attack)}
              disabled={
                context.battleState !== BattleState.BATTLE ||
                pokemon.actualEnergy <= 0
              }
            >
              {attack}
            </button>
          </li>
        ))}
      <li className="attack-item addons">
        {" "}
        <button disabled={context.battleState !== BattleState.BATTLE}>
          rest
        </button>{" "}
      </li>
      <li className="attack-item addons">
        {" "}
        <button disabled={context.battleState !== BattleState.BATTLE}>
          avoid
        </button>
      </li>
      {time > 0 && <AttackCountdown time={time} setTime={setTime} />}
    </ul>
  );
};

export default BoxAttacks;
