import EnergyBar from "@/components/EnergyBar";
import HpBar from "@/components/HpBar";
import { Pokemon } from "@/types/pokemon";

interface UserPokemonStatsProps {
  pokemon: Pokemon;
}

const UserPokemonStats = ({ pokemon }: UserPokemonStatsProps) => {
  return (
    <div className="box-stats">
      <span>
        {pokemon.name} {pokemon.level}
      </span>
      <HpBar actualHp={pokemon.actualHp} maximumHp={pokemon.hp} />
      <EnergyBar
        actualEnergy={pokemon.actualEnergy}
        maximumEnergy={pokemon.energy}
      />
    </div>
  );
};

export default UserPokemonStats;
