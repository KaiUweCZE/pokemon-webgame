import { PokemonContext } from "@/contexts/PokemonContext";
import { useContext } from "react";

const AttacksList = () => {
  const context = useContext(PokemonContext);

  if (!context) return null;

  const pokemon = context.currentPokemon;
  return (
    <ul className="box-attacks">
      {pokemon &&
        pokemon.attacks.map((attack) => (
          <li key={attack} className="attack-item">
            {attack}
          </li>
        ))}
      <li className="attack-item addons">rest </li>
      <li className="attack-item addons">avoid</li>
    </ul>
  );
};

export default AttacksList;

/*
<ul className="box-attacks">
      {context.userPokemon?.attacks.map((attack, index) => (
        <li
          key={index}
          className="attack-item"
          onClick={() => handleAttack(attack)}
        >
          {attack}
        </li>
      ))}

      <li
        className="attack-item addons"
        onClick={() => handleRest(userPokemon.id)}
      >
        rest{" "}
      </li>
      <li className="attack-item addons">avoid</li>

      {time > 0 && <AttackCountdown time={time} setTime={setTime} />}
    </ul>
*/
