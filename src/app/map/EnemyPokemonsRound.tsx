import { pokemonBattleData } from "@/data/pokemonBattleData";
import Image from "next/image";

interface EnemyRoundsProps {
  pokemonIds: number[];
  round: number;
}

const EnemyPokemonsRound = ({ pokemonIds, round }: EnemyRoundsProps) => {
  const pokemonImgs = pokemonBattleData.filter((pokemon) =>
    pokemonIds.includes(pokemon.id)
  );
  return (
    <li>
      <span>{round + 1}. </span>
      <div>
        {pokemonImgs.map((poke) => (
          <Image key={poke.id} src={poke.img} alt="poke" />
        ))}
      </div>
    </li>
  );
};

export default EnemyPokemonsRound;
