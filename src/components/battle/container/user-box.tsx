import Image, { StaticImageData } from "next/image";
import BattlePokemonStats from "../battle-pokemon-stats";
import { BattlePokemon, PokemonName } from "@/types/pokemon";
import ilustrationImg from "@/images/attacks/thunder.webp";
import AttackAnimation from "../attack-animation";
import { setEnemyAttackAnimation } from "@/store/battle/actions/battle-animations";

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

const UserBox = ({ userPokemon }: { userPokemon: BattlePokemon }) => {
  return (
    <div className="user-box">
      <div className="user-image-box relative">
        <Image
          className="user-pokemon-image"
          src={userPokemon.image.back.src}
          alt={userPokemon.image.back.alt}
          width={140}
          height={140}
        />
        <AttackAnimation
          image={ilustrationImg}
          className="translate-x-16"
          setAnimation={setEnemyAttackAnimation}
        />
      </div>
      <div className="user-stats-box">
        <BattlePokemonStats
          pokemonName={userPokemon.name}
          pokemonLevel={userPokemon.level}
          maxHp={userPokemon.maxHp}
          currentHp={userPokemon.currentHp}
          userStats={{
            maxEnergy: userPokemon.maxEnergy,
            currentEnergy: userPokemon.currentEnergy,
            expToNextLevel: userPokemon.expToNextLevel,
            currentExp: userPokemon.currentExp,
          }}
        />
      </div>
    </div>
  );
};

export default UserBox;
