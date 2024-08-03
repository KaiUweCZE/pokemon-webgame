import EnergyBar from "@/components/EnergyBar";
import ExpBar from "@/components/ExpBar";
import HpBar from "@/components/HpBar";
import { Pokemon } from "@/types/pokemon";

interface UserPokemonStatsProps {
  pokemon: Pokemon;
}

const UserPokemonStats = ({ pokemon }: UserPokemonStatsProps) => {
  return (
    <div className="box-stats">
      <div className="name-level">
        <span>{pokemon.name}</span>
        <span>lv.{pokemon.level}</span>
      </div>
      <div className="box-bars">
        <div className="bar-wrapper">
          <span>HP</span>
          <HpBar actualHp={pokemon.actualHp} maximumHp={pokemon.hp} />
        </div>
        <div className="bar-wrapper">
          <span>EN</span>
          <EnergyBar
            actualEnergy={pokemon.actualEnergy}
            maximumEnergy={pokemon.energy}
          />
        </div>
        {/*<div className="bar-wrapper">
            <span>exp.</span>
            <ExpBar
              expToLevel={pokemon.expToLevel}
              actualExp={pokemon.actualExp}
            />
          </div>*/}
      </div>
    </div>
  );
};

export default UserPokemonStats;
