import { typesOfPokemon } from "@/data/typesOfPokemonData";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Attack } from "@/types/attack";
import { Dispatch, SetStateAction } from "react";

interface AboutAttackProps {
  attack: Attack;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

const AboutAttack = ({ setActive, active, attack }: AboutAttackProps) => {
  const { isVisible } = useClickOutside(setActive, active, ".about-attack");
  const advanteges = typesOfPokemon.find(
    (e) => e.name === attack.type
  )?.advantage;
  return (
    <>
      {isVisible && (
        <article className="about-attack">
          <h3>{attack.name}</h3>
          <ul className="attack-atributes">
            <li>type: {attack.type}</li>
            <li>damage: {attack.damage}</li>
            <li>energy: {attack.energyCost}</li>
            <li>recovery: {attack.recoveryTime}</li>
            <li>
              <ul className="attack-advantages">
                <li>advanteges: </li>
                {advanteges && advanteges?.length > 0 ? (
                  advanteges?.map((advantege) => (
                    <li key={advantege}>{advantege}</li>
                  ))
                ) : (
                  <li>none</li>
                )}
              </ul>
            </li>
          </ul>
        </article>
      )}
    </>
  );
};

export default AboutAttack;
