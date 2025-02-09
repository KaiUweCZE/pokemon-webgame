import Image, { StaticImageData } from "next/image";
import BattlePokemonStats from "../battle-pokemon-stats";
import { PokemonName } from "@/types/pokemon";
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

const EnemyBox = ({ enemy }: { enemy: Enemy }) => {
  return (
    <div className="enemy-box">
      <div className="enemy-stats-box">
        <BattlePokemonStats
          pokemonName={enemy.name}
          pokemonLevel={enemy.level}
          maxHp={enemy.maxHp}
          currentHp={enemy.currentHp}
        />
      </div>
      <div className="enemy-image-box">
        <Image
          className="enemy-image"
          src={enemy.image.src}
          alt={enemy.image.alt}
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
