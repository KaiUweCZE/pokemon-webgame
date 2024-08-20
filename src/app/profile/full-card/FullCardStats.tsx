import EnergyBar from "@/components/EnergyBar";
import ExpBar from "@/components/ExpBar";
import HpBar from "@/components/HpBar";
import { Pokemon } from "@/types/pokemon";

interface FullCardStatsProps {
  pokemon: Pokemon;
}

const FullCardStats = ({ pokemon }: FullCardStatsProps) => {
  return (
    <div className="right-side">
      <ul>
        <li>level: {pokemon.level}</li>
        <li>hp: {pokemon.hp}</li>
        <li>energy: {pokemon.energy}</li>
        <li>next level: {pokemon.expToLevel - pokemon.actualExp} exp.</li>
        <li>damage: {pokemon.damage}</li>
        <li>defense: {pokemon.defense}</li>
        <li>speed: {pokemon.speed}</li>
        <li>
          hp: <HpBar maximumHp={pokemon.hp} actualHp={pokemon.actualHp} />
        </li>
        <li>
          en:{" "}
          <EnergyBar
            maximumEnergy={pokemon.energy}
            actualEnergy={pokemon.actualEnergy}
          />
        </li>
        <li>
          ex:{" "}
          <ExpBar
            expToLevel={pokemon.expToLevel}
            actualExp={pokemon.actualExp}
          />
        </li>
      </ul>
    </div>
  );
};

export default FullCardStats;
