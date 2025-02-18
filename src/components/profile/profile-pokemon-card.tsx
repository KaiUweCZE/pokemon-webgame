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
    <div className="relative grid h-fit w-full rounded-sm bg-element-light/20 p-4 shadow-primary">
      <Image
        className="profile-pokemon-img"
        src={pokemonImg.src}
        alt={pokemonImg.alt}
        width={80}
        height={80}
      />
      <div className="relative grid gap-2">
        <div className="flex flex-col">
          <h3 className="text-slate-100">
            {capitalize(pokemon.name)} lvl.{pokemon.level}
          </h3>
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
