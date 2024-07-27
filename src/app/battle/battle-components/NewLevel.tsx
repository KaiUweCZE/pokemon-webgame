import { BattleContext } from "@/contexts/BattleContext";
import { useContext } from "react";

const NewLevel = () => {
  const context = useContext(BattleContext);

  if (!context) {
    throw new Error("context is missing");
  }

  const pokemon = context.userPokemon;
  return (
    <div className="new-level">
      <ul>
        <li>
          <h3>{`level: ${pokemon?.level}`}</h3>
        </li>
        <li>{`hp: ${pokemon?.hp}`}</li>
        <li>{`damage: ${pokemon?.damage}`}</li>
        <li>{`defense: ${pokemon?.defense}`}</li>
        <li>{`speed: ${pokemon?.speed}`}</li>
        <li>{`energy: ${pokemon?.energy}`}</li>
      </ul>
    </div>
  );
};

export default NewLevel;
