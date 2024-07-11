import { PokemonBattle } from "@/types/pokemonBattle";
import HpBar from "../../../components/HpBar";
import Image from "next/image";
import { generatePokemonImage } from "@/utils/generatePokemonImage";
import { useContext } from "react";
import { BattleContext } from "@/contexts/BattleContext";

interface EnemyPokemonProps {
  enemyPokemon: PokemonBattle;
}

const EnemyPokemon = ({ enemyPokemon }: EnemyPokemonProps) => {
  const context = useContext(BattleContext);

  const pokemonImg = generatePokemonImage(enemyPokemon.name);
  return (
    <div
      className={
        enemyPokemon.actualHp === 0 ? "enemy-pokemon done" : "enemy-pokemon"
      }
    >
      {enemyPokemon.actualHp !== undefined ? (
        <>
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
