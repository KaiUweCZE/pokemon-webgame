import { PokemonImages } from "@/types/image";
import { Pokemon } from "@/types/pokemon";
import { cn } from "@/utils/cn";
import Image from "next/image";
import ActivePokemonDetail from "./active-pokemon-detail";

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
  const slotClass = "rounded-sm bg-primary-accent/40 border border-primary-accent/80";
  // return empty box iff user has less than 6 pokemons in his team
  if (!pokemon || !image) {
    return (
      <div
        className={cn(slotClass, "border-dashed")}
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
          `cursor-move hover:bg-primary-accent/80`,
          slotClass,
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

      <ActivePokemonDetail pokemon={pokemon} onRemove={onRemove} hpTextColor={hpTextColor} />
    </div>
  );
};

export default PokemonTeamSlot;
