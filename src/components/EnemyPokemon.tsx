import { PokemonBattle } from "@/types/pokemonBattle";
import HpBar from "./HpBar";
import Image from "next/image";
import { generatePokemonImage } from "@/utils/generatePokemonImage";

interface EnemyPokemonProps {
  enemyPokemon: PokemonBattle;
}

const EnemyPokemon = ({ enemyPokemon }: EnemyPokemonProps) => {
  const pokemonImg = generatePokemonImage(enemyPokemon.name);
  return (
    <div className="enemy-pokemon">
      {pokemonImg && (
        <Image src={pokemonImg} alt="enemy pokemon" width={160} height={160} />
      )}
      <div className="enemy-pokemon-info">
        <span>{enemyPokemon.name}</span>
        <HpBar maximumHp={enemyPokemon.hp} actualHp={enemyPokemon.actualHp} />
      </div>
    </div>
  );
};

export default EnemyPokemon;
