import Image, { StaticImageData } from "next/image";
import BattlePokemonStats from "../battle-pokemon-stats";
import { type EnemyPokemon, type PokemonName } from "@/types/pokemon";
import battlefieldImg from "@/images/fields/field2.webp";

export interface Enemy {
  name: PokemonName;
  image: {
    src: string | StaticImageData;
    alt: string;
  };
  level: number;
  maxHp: number;
  currentHp: number;
}

const EnemyBox = ({ enemyPokemon }: { enemyPokemon: EnemyPokemon }) => {
  return (
    <div className="enemy-box">
      <div className="enemy-stats-box">
        <BattlePokemonStats
          pokemonName={enemyPokemon.name}
          pokemonLevel={enemyPokemon.level}
          maxHp={enemyPokemon.maxHp}
          currentHp={enemyPokemon.currentHp}
        />
      </div>
      <div className="enemy-image-box">
        <Image
          className="enemy-image"
          src={enemyPokemon.image?.default.src}
          alt={enemyPokemon.image?.default.alt}
          width={120}
          height={120}
        />
        <Image
          className="enemy-field"
          src={battlefieldImg}
          alt="ground under pokemon"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
};

export default EnemyBox;
