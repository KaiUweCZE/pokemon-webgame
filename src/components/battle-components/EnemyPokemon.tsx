import { PokemonBattle } from "@/types/pokemonBattle";
import HpBar from "../HpBar";
import Image from "next/image";
import { generatePokemonImage } from "@/utils/generatePokemonImage";
import { useContext } from "react";
import { BattleContext } from "@/contexts/BattleContext";
import { generatePokemon } from "@/utils/generatePokemon";

interface EnemyPokemonProps {
  enemyPokemon: PokemonBattle;
}

const EnemyPokemon = ({ enemyPokemon }: EnemyPokemonProps) => {
  const context = useContext(BattleContext);

  const handleNextPokemon = () => {
    const newEnemy = generatePokemon(2);
    context?.setEnemyPokemon(newEnemy);
  };
  const pokemonImg = generatePokemonImage(enemyPokemon.name);
  return (
    <div
      className={
        enemyPokemon.actualHp === 0 ? "enemy-pokemon done" : "enemy-pokemon"
      }
    >
      {enemyPokemon.actualHp !== 0 ? (
        <>
          {" "}
          {pokemonImg && (
            <Image
              src={pokemonImg}
              alt="enemy pokemon"
              width={160}
              height={160}
            />
          )}
          <div className="enemy-pokemon-info">
            <span>{enemyPokemon.name}</span>
            <HpBar
              maximumHp={enemyPokemon.hp}
              actualHp={enemyPokemon.actualHp}
            />
          </div>
        </>
      ) : (
        <button className="button-primary" onClick={handleNextPokemon}>
          next pokemon
        </button>
      )}
    </div>
  );
};

export default EnemyPokemon;
