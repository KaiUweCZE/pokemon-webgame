import { pokemonsImg } from "@/images";
import Image from "next/image";
import React, { useState } from "react";
import char from "@/images/pokemons/charizard.webp";
import { PokemonName } from "@/types/pokemon";

const PokemonSix = () => {
  const [pokemons, setPokemons] = useState<string[]>([
    "charizard",
    "pikachu",
    "raichu",
    "blastoise",
    "infernape",
    "zubat",
  ]);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const pokemonsImages = pokemonsImg;

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex === null) return;

    const newPokemons = [...pokemons];
    const draggedPokemon = newPokemons[draggedIndex];

    // Odstraníme pokémona z původní pozice a vložíme ho na novou
    newPokemons.splice(draggedIndex, 1);
    newPokemons.splice(dropIndex, 0, draggedPokemon);

    setPokemons(newPokemons);
    setDraggedIndex(null);
  };

  return (
    <div className="grid h-12 w-60 grid-cols-6 gap-2 rounded-sm border border-purple-300 bg-primary-dark/85 p-2 shadow-secondary">
      {pokemons.map((pokemon, index) => (
        <div
          key={`${pokemon}-${index}`}
          className={`cursor-move rounded-sm bg-element-light/20 hover:bg-element-light/30 ${draggedIndex === index ? "opacity-50" : "opacity-100"} transition-all duration-200`}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
        >
          <Image
            src={pokemonsImg[pokemon as PokemonName].icon.src}
            alt="cosi"
            width={40}
            height={40}
          />
        </div>
      ))}
    </div>
  );
};

export default PokemonSix;
