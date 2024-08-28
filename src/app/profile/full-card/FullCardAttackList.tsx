import { Attack } from "@/types/attack";
import { useState } from "react";
import AboutAttack from "./AboutAttack";

interface AttackListProps {
  attacks: Attack[];
}

const FullCardAttacksList = ({ attacks }: AttackListProps) => {
  const [active, setActive] = useState(false);
  const [specificAttack, setSpecificAttack] = useState<Attack | null>(null);

  const handleAboutAttack = (attack: Attack) => {
    console.log("Info about attack!!!");
    setSpecificAttack(attack);
    setActive(true);
  };
  return (
    <ul className="full-card-attacks">
      {attacks.map((attack, index) => (
        <li
          key={attack.name + index}
          className={`${attack.type}`}
          onClick={() => handleAboutAttack(attack)}
        >
          {attack.name}
        </li>
      ))}
      {active && specificAttack && (
        <AboutAttack
          setActive={setActive}
          active={active}
          attack={specificAttack}
        />
      )}
    </ul>
  );
};

export default FullCardAttacksList;
