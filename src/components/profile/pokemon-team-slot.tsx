import { PokemonImages } from "@/types/image";
import { Pokemon } from "@/types/pokemon";
import { cn } from "@/utils/cn";
import Image from "next/image";
import ElementType from "../ui/primitives/element-type";

interface PokemonSlotProps {
  pokemon: Pokemon | null;
  image: PokemonImages | null;
  index: number;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  isDragging: boolean;
  onRemove?: (pokemonId: string) => void;
}

const PokemonTeamSlot = ({
  pokemon,
  image,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
  onRemove,
}: PokemonSlotProps) => {
  if (!pokemon || !image) {
    return (
      <div
        className="rounded-sm bg-element-light/60"
        /*onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, index)}*/
      ></div>
    );
  }

  const hpTextColor = pokemon.currentHp * 2 < pokemon.maxHp ? "text-rose-400" : "text-emerald-400";

  return (
    <div className="group relative">
      <div
        className={cn(
          `cursor-move rounded-sm bg-element-light/60 transition-all duration-200 hover:bg-element-light/30`,
          isDragging && "opacity-50"
        )}
        draggable
        onDragStart={(e) => onDragStart(e, index)}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, index)}
      >
        <Image
          src={image.icon.src}
          alt={`${pokemon.name} icon`}
          width={32}
          height={32}
          className="object-contain"
        />
      </div>
      {/* prettier-ignore */}
      <div
        className={`pokemon-slot-detail text-xs 
            rounded-sm bg-primary-dark/80 p-2  w-xs
            shadow-secondary group-hover:visible
            group-hover:opacity-100`}
      >
        <div className="flex items-center justify-between text-amber-200">
          <span className="font-medium capitalize">{pokemon.name}</span>
          <span className="text-xs">Lvl {pokemon.level}</span>
        </div>

        <div className="mt-1 flex gap-1">
          {pokemon.types.map((type) => (
            <ElementType
              key={type}
              variant={type}
              size="xxs"
              className="px-1"
            />
          ))}
        </div>

        <div className="mt-1 grid grid-cols-2 gap-1 text-xxs">
          <span className={hpTextColor}>
            HP: {pokemon.currentHp}/{pokemon.maxHp}
          </span>
          <span className="text-sky-300">
            E: {pokemon.currentEnergy}/{pokemon.maxEnergy}
          </span>
        </div>
        {onRemove && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onRemove(pokemon.id);
            }}
            className="mt-2 w-full rounded-sm bg-red-500 px-1 py-0.5 text-xxs text-red-200
                      transition-colors hover:bg-red-600"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default PokemonTeamSlot;
