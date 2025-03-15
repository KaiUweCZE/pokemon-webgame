import { Pokemon } from "@/types/pokemon";
import { Button } from "../ui/primitives/button";
import ElementType from "../ui/primitives/element-type";
import { Bar } from "../ui/primitives/bar";
import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";
import StatBar from "../ui/primitives/stat-bar";

interface ActivePokemonDetailProps {
  pokemon: Pokemon;
  onRemove?: (id: string) => void;
  hpTextColor?: string;
}

const ActivePokemonDetail = ({ pokemon, onRemove, hpTextColor }: ActivePokemonDetailProps) => {
  const hpPercentage = (pokemon.currentHp / pokemon.maxHp) * 100;
  const isCriticalHp = hpPercentage <= 25;

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();

    onRemove?.(pokemon.id);
  };
  return (
    <div className="pokemon-slot-detail w-xs rounded-sm bg-primary-dark/80 p-2 text-xs shadow-secondary group-hover:visible group-hover:opacity-100">
      {/*arrow aiming to slot*/}
      <div className="absolute -top-2 left-1 h-0 w-0 border-x-8 border-b-8 border-x-transparent border-b-primary-dark"></div>

      <div className="flex items-center justify-between text-amber-200">
        <h4 className="font-medium capitalize">{pokemon.name}</h4>
        <span className="rounded bg-amber-900/50 px-1.5 text-xs font-bold">
          Lvl {pokemon.level}
        </span>
      </div>

      <div className="mt-2 flex gap-1">
        {pokemon.types.map((type) => (
          <ElementType key={type} variant={type} size="sm" className="px-1" />
        ))}
      </div>

      {/*<div className="mt-3">
        <StatBar
          variant="hp"
          label="hp"
          height="xs"
          actualValue={pokemon.currentHp}
          maxValue={pokemon.maxHp}
          animate={isCriticalHp}
          lowThreshold={25}
          width="full"
        />
        <StatBar
          variant="energy"
          label="eng"
          height="xs"
          actualValue={pokemon.currentEnergy}
          maxValue={pokemon.maxEnergy}
          animate={isCriticalHp}
          lowThreshold={25}
        />
        <StatBar
          variant="exp"
          label="exp"
          height="xs"
          actualValue={pokemon.currentExp}
          maxValue={pokemon.expToNextLevel}
          animate={isCriticalHp}
          lowThreshold={25}
        />
      </div>*/}

      {/* Stats Section */}
      <div className="mt-3 grid grid-cols-2 gap-1 text-xs">
        <div className="flex items-center gap-1">
          <span className="text-amber-100/70">Hp:</span>
          <span className="col-span-2 font-medium text-emerald-200">
            {pokemon.currentHp}/{pokemon.maxHp}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-amber-100/70">Eng:</span>
          <span className="col-span-2 font-medium text-amber-100">
            {pokemon.currentEnergy}/{pokemon.maxEnergy}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-amber-100/70">Damage:</span>
          <span className="col-span-2 font-medium text-amber-100">{pokemon.damage}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-amber-100/70">Defense:</span>
          <span className="col-span-2 font-medium text-amber-100">{pokemon.defense}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-amber-100/70">Speed:</span>
          <span className="col-span-2 font-medium text-amber-100">{pokemon.speed}</span>
        </div>
      </div>

      {/* Return to Box Button */}
      {onRemove && (
        <div className="mt-3">
          <Button onClick={handleRemove} className="w-full" size="sm" variant="destructive">
            <span className="text-xs text-amber-100">Return to Box</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActivePokemonDetail;
