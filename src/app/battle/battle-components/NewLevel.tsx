import { BattleContext } from "@/contexts/BattleContext";
import { Pokemon } from "@/types/pokemon";
import { useContext } from "react";

interface NewLevelProps {
  pokemon: Pokemon;
}

const NewLevel = ({ pokemon }: NewLevelProps) => {
  const context = useContext(BattleContext);

  if (!context) {
    throw new Error("context is missing");
  }
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
