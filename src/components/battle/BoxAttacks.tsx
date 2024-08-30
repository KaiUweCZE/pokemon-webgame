import { PokemonContext } from "@/contexts/PokemonContext";
import { useContext, useState } from "react";
import { attacksData } from "@/data/attacksData";
import AttackCountdown from "./AttackCountdown";
import { restAfterAttack } from "@/utils/battle-function/restAfterAttack";
import { BattleState } from "@/types/enums/battleState";
import { useBattleContext } from "@/hooks/useBattleContext";
import { restEng } from "@/utils/battle-function/restEng";

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

  const handleRest = async () => {
    console.log("actual pokemon: ", pokemon);

    if (pokemon?.id) {
      try {
        const updatedPokemon = await restEng(pokemon.id);
        if (updatedPokemon) {
          pokemonContext.setCurrentPokemon({
            ...pokemon,
            actualEnergy: updatedPokemon.actualEnergy,
          });
          setTime(5);
          console.log("updated pokemon: ", updatedPokemon);
        }
      } catch (error) {
        console.error("Error while resting:", error);
      }
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
        <button
          disabled={context.battleState !== BattleState.BATTLE}
          onClick={handleRest}
        >
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
