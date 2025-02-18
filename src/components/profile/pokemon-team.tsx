import { pokemonsImg } from "@/images";
import Image from "next/image";
import React from "react";
import { Pokemon, PokemonName } from "@/types/pokemon";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "../ui/primitives/button";
import { PokemonImages } from "@/types/image";
import { usePokemonDragAndDrop } from "@/hooks/use-drag-and-drop";
import { cn } from "@/utils/cn";

interface PokemonSlotProps {
  pokemon: Pokemon | null;
  image: PokemonImages | null;
  index: number;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  isDragging: boolean;
}

const PokemonSlot = ({
  pokemon,
  image,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
}: PokemonSlotProps) => {
  if (!pokemon || !image) {
    return (
      <div
        className="h-8 w-8 rounded-sm bg-element-light/10"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, index)}
      />
    );
  }

  return (
    <div
      className={cn(
        "cursor-move rounded-sm bg-element-light/20 transition-all duration-200 hover:bg-element-light/30",
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
  );
};

const PokemonTeam = () => {
  const { data: user } = useCurrentUser();
  const { activePokemon, draggedIndex, handleDragStart, handleDragOver, handleDrop } =
    usePokemonDragAndDrop(user?.activePokemonIds ?? [], user?.pokemons ?? []);

  if (!user) return null;

  return (
    <div className="grid h-12 w-60 grid-cols-6 gap-2 rounded-sm border border-purple-300 bg-primary-dark/85 p-2 shadow-secondary">
      {Array.from({ length: 6 }).map((_, index) => {
        const currentPokemon = activePokemon[index];
        return (
          <PokemonSlot
            key={currentPokemon?.pokemon?.id ?? index}
            pokemon={currentPokemon?.pokemon ?? null}
            image={currentPokemon?.image ?? null}
            index={index}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            isDragging={draggedIndex === index}
          />
        );
      })}
    </div>
  );
};

export default PokemonTeam;
