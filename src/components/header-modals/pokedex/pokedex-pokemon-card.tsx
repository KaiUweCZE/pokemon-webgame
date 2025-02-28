import { Card } from "@/components/ui/primitives/card";
import ElementType from "@/components/ui/primitives/element-type";
import { pokemonsImg } from "@/images";
import { usePokedexStore } from "@/store/pokedex-store";
import Image from "next/image";
import PokemonLocation from "./pokemon-location";

const PokemonPokedexCard = () => {
  const { currentPokemon } = usePokedexStore();
  if (!currentPokemon) return null;
  const pokemonImg = pokemonsImg[currentPokemon.name];
  return (
    <Card variant="basic" size="sm" className="h-fit rounded-sm bg-inventory-accent/60">
      <div className="pokedex-pokemon-card gap-3">
        <Image src={pokemonImg.default.src} alt={pokemonImg.default.alt} width={100} height={100} />
        <article className="grid gap-2">
          <h3 className="capitalize text-amber-200">{currentPokemon.name}</h3>
          <div className="flex gap-1">
            {currentPokemon.types.map((type) => (
              <ElementType key={type} variant={type} />
            ))}
          </div>
          {}
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-amber-100">HP:</span>
              <span className="text-amber-50">{currentPokemon.hp}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-amber-100">Eng:</span>
              <span className="text-amber-50">{currentPokemon.energy}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-amber-100">Dmg.:</span>
              <span className="text-amber-50">{currentPokemon.damage}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-amber-100">Def.:</span>
              <span className="text-amber-50">{currentPokemon.defense}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-amber-100">Spd.:</span>
              <span className="text-amber-50">{currentPokemon.speed}</span>
            </div>
          </div>
        </article>{" "}
        <PokemonLocation />
      </div>
    </Card>
  );
};

export default PokemonPokedexCard;
