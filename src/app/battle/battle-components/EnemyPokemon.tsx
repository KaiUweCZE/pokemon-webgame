import { PokemonBattle } from "@/types/pokemonBattle";
import HpBar from "../../../components/HpBar";
import Image from "next/image";
import { generatePokemonImage } from "@/utils/generatePokemonImage";
import { useContext } from "react";
import { BattleContext } from "@/contexts/BattleContext";
import pokeball from "@/assets/images/icons/pokeball.webp";
import Pokeball from "@/components/Pokeball";

interface EnemyPokemonProps {
  enemyPokemon: PokemonBattle;
}

const EnemyPokemon = ({ enemyPokemon }: EnemyPokemonProps) => {
  const context = useContext(BattleContext);

  const pokemonImg = generatePokemonImage(enemyPokemon.name);

  const getClassName = () => {
    if (enemyPokemon.actualHp === 0) {
      return "enemy-pokemon done";
    }
    if (context?.isCatching.underway) {
      return "enemy-pokemon catching";
    }
    if (context?.isCatching.isSucces) {
      return "enemy-pokemon catched";
    }
    return "enemy-pokemon";
  };

  return (
    <div className={getClassName()}>
      {enemyPokemon.actualHp !== undefined ? (
        <>
          {(context?.isCatching.underway || context?.isCatching.isSucces) && (
            <Pokeball />
          )}
          {pokemonImg && (
            <Image
              src={pokemonImg}
              alt="enemy pokemon"
              width={160}
              height={160}
            />
          )}
          <div className="enemy-pokemon-info">
            <span>{`${enemyPokemon.name} lvl.${enemyPokemon.level}`}</span>
            <HpBar
              maximumHp={enemyPokemon.hp}
              actualHp={enemyPokemon.actualHp}
            />
          </div>
        </>
      ) : (
        <p>where he is?</p>
      )}
    </div>
  );
};

export default EnemyPokemon;
