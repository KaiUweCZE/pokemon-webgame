import HpBar from "@/components/HpBar";
import { PokemonBattle } from "@/types/pokemonBattle";

interface OponentPokemonStatsProps {
  pokemon: PokemonBattle;
}

const OponentPokemonStats = ({ pokemon }: OponentPokemonStatsProps) => {
  return (
    <div className="box-stats">
      <div className="name-level">
        <span>{pokemon.name}</span>
        <span>lv.{pokemon.level}</span>
      </div>
      <div className="bar-wrapper">
        <span>HP</span>
        <HpBar maximumHp={pokemon.hp} actualHp={pokemon.actualHp} />
      </div>
    </div>
  );
};

export default OponentPokemonStats;
