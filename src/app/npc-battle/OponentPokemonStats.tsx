import HpBar from "@/components/HpBar";
import { PokemonBattle } from "@/types/pokemonBattle";

interface OponentPokemonStatsProps {
  pokemon: PokemonBattle;
}

const OponentPokemonStats = ({ pokemon }: OponentPokemonStatsProps) => {
  return (
    <div>
      <span>
        {pokemon.name} {pokemon.level}
      </span>
      <HpBar maximumHp={pokemon.hp} actualHp={pokemon.actualHp} />
    </div>
  );
};

export default OponentPokemonStats;
