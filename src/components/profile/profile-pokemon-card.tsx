import { pokemonsImg } from "@/images";
import { Pokemon, PokemonName } from "@/types/pokemon";
import Image from "next/image";
import { Bar } from "../ui/primitives/bar";
import { capitalize } from "@/utils/string";
import ElementType from "../ui/primitives/element-type";
import BarBox from "./bar-box";

interface ProfilePokemonCardProps {
  pokemon: Pokemon;
}
const ProfilePokemonCard = ({ pokemon }: ProfilePokemonCardProps) => {
  const pokemonImg = pokemonsImg[pokemon.name as PokemonName].default;
  return (
    <div className="grid w-fit rounded-sm bg-amber-500/5 p-4 shadow-primary">
      <Image
        className="profile-pokemon-img"
        src={pokemonImg.src}
        alt={pokemonImg.alt}
        width={100}
        height={100}
      />
      <div className="grid gap-2">
        <div className="inline-flex items-center gap-2">
          <h3>{capitalize(pokemon.name)}</h3>
          {pokemon.types.map((type) => (
            <ElementType key={type} variant={type} />
          ))}
        </div>
        <BarBox
          actualHp={pokemon.currentHp}
          maxHp={pokemon.maxHp}
          actualEnergy={pokemon.currentEnergy}
          maxEnergy={pokemon.maxEnergy}
          actualExp={pokemon.currentExp}
          expToNextLevel={pokemon.expToNextLevel}
        />
      </div>
    </div>
  );
};

export default ProfilePokemonCard;
