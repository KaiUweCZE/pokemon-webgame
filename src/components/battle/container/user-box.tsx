import Image, { StaticImageData } from "next/image";
import BattlePokemonStats from "../battle-pokemon-stats";
import { PokemonName } from "@/types/pokemon";

export type UserPokemon = {
  pokemonName: PokemonName;
  image: {
    src: StaticImageData | string;
    alt: string;
  };
  level: number;
  maxHp: number;
  currentHp: number;
  expToNextLevel: number;
  currentExp: number;
};

interface UserBoxProps {
  userPokemon: UserPokemon;
}

const UserBox = ({ userPokemon }: UserBoxProps) => {
  return (
    <div className="user-box">
      <div className="user-image-box">
        <Image
          className="user-pokemon-image"
          src={userPokemon.image.src}
          alt={userPokemon.image.alt}
          width={140}
          height={140}
        />
      </div>
      <div className="user-stats-box">
        <BattlePokemonStats
          pokemonName={userPokemon.pokemonName}
          pokemonLevel={userPokemon.level}
          maxHp={userPokemon.maxHp}
          currentHp={userPokemon.currentHp}
          userStats={{
            maxEnergy: 100,
            currentEnergy: 40,
            expToNextLevel: 100,
            currentExp: 40,
          }}
        />
      </div>
    </div>
  );
};

export default UserBox;
