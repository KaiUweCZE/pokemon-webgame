// explore-dialog.tsx
import { useState } from "react";
import { DialogHeader } from "./components/dialog-header";
import { useCurrentUser } from "@/hooks/use-current-user";
import { type LocationName } from "@/types/location";
import { locationData } from "@/data/locations/location-data";
import { Button } from "@/components/ui/primitives/button";
import Image from "next/image";
import { pokemonsImg } from "@/images";
import { PokemonName } from "@/types/pokemon";

const ExploreDialog = () => {
  const { data: user } = useCurrentUser();
  const location = user?.location.toLowerCase() as LocationName;
  const areas = locationData[location].areas;

  // Funkce pro získání obrázku pokémona
  const getPokemonIcon = (pokemonName: PokemonName) => {
    return pokemonsImg[pokemonName]?.default.src || "";
  };

  // Funkce pro průzkum oblasti - zatím jen základní
  const handleExplore = () => {
    // Tady půjde logika pro průzkum
    console.log("Exploring area 1");
  };

  return (
    <div className="grid gap-4">
      <DialogHeader title="Explore Area" />

      {/* Sekce s informacemi o oblasti */}
      <div className="grid gap-4 rounded-lg border border-element/20 bg-primary/5 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-primary-text">Area 1</h3>
          <span className="text-sm text-secondary-text">
            Level {areas[1].min} - {areas[1].max}
          </span>
        </div>

        {/* Seznam pokémonů v oblasti */}
        <div className="grid gap-2">
          <h4 className="text-sm font-medium text-secondary-text">Available Pokémon:</h4>
          <div className="flex flex-wrap gap-2">
            {areas[1].pokemons.map((pokemon) => (
              <div
                key={pokemon}
                className="flex items-center gap-2 rounded-lg border border-element/20 bg-primary/10 p-2"
              >
                <Image
                  src={getPokemonIcon(pokemon)}
                  alt={pokemon}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="text-sm capitalize text-primary-text">{pokemon}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tlačítko pro průzkum */}
        <Button onClick={handleExplore} className="w-full" variant="outline">
          Explore Area
        </Button>
      </div>
    </div>
  );
};

export default ExploreDialog;
