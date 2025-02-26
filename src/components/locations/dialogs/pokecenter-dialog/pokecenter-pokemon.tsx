import { Bar } from "@/components/ui/primitives/bar";
import { pokemonsImg } from "@/images";
import { Pokemon } from "@/types/pokemon";
import { cn } from "@/utils/cn";
import Image from "next/image";
// Ikony z Lucide
import { Skull, AlertTriangle, Heart, Bandage, HeartCrack } from "lucide-react";

const PokecenterPokemon = ({
  pokemon,
  isHealed = false,
}: {
  pokemon: Pokemon;
  isHealed?: boolean;
}) => {
  const getPokemonHealthStatus = (pokemon: Pokemon) => {
    // Pokud je pokémon vyléčený, vrátíme "healthy"
    if (isHealed) return "healthy";

    const healthPercentage = (pokemon.currentHp / pokemon.maxHp) * 100;
    if (healthPercentage === 0) return "fainted";
    if (healthPercentage < 30) return "critical";
    if (healthPercentage < 70) return "wounded";
    return "healthy";
  };

  const healthStatus = getPokemonHealthStatus(pokemon);

  // Získání ikony a barvy podle stavu zdraví
  const getStatusIcon = () => {
    switch (healthStatus) {
      case "fainted":
        return <Skull className="absolute left-1 top-1 h-4 w-4 text-gray-300" />;
      case "critical":
        return (
          <HeartCrack
            className="drop absolute left-1 top-1 h-4 w-4 animate-pulse text-red-500"
            fill="#9F0712"
          />
        );
      case "wounded":
        return <Bandage className="absolute left-1 top-1 h-4 w-4 text-amber-400" />;
      case "healthy":
        return <Heart className="absolute left-1 top-1 h-4 w-4 text-red-500" fill="#EC003Fcb" />;
      default:
        return null;
    }
  };

  // Získání barvy okraje podle stavu zdraví
  const getStatusBox = () => {
    switch (healthStatus) {
      case "fainted":
        return "border-gray-700/60 bg-slate-950/10";
      case "critical":
        return "border-rose-900/60 bg-red-600/10";
      case "wounded":
        return "border-amber-700";
      case "healthy":
        return "border-green-700/60 bg-green-600/10";
      default:
        return "border-transparent";
    }
  };

  return (
    <div
      className={cn(
        "relative flex items-center gap-2 rounded-md border p-2 transition-all duration-300",
        getStatusBox()
      )}
    >
      {" "}
      {getStatusIcon()}
      <div className="relative">
        <Image
          src={pokemonsImg[pokemon.name].icon.src}
          alt={pokemonsImg[pokemon.name].icon.alt}
          width={32}
          height={32}
          className={cn("transition-all", healthStatus === "fainted" && "opacity-50")}
        />
        {/* Status indicator badge */}
      </div>
      <div className="w-fit">
        <div className="flex items-center justify-between gap-2 text-amber-100">
          <span className="text-xs capitalize">{pokemon.name}</span>
          <span className="text-xs">Lv. {pokemon.level}</span>
        </div>

        <div className="mt-1 space-y-1">
          <Bar
            variant="hp"
            height="sm"
            width="xs"
            label
            labelPosition="inside"
            showValues
            actualValue={isHealed ? pokemon.maxHp : pokemon.currentHp}
            maxValue={pokemon.maxHp}
            animate={healthStatus === "critical"}
          />

          {/* <Bar
            variant="energy"
            height="xs"
            width="sm"
            actualValue={isHealed ? pokemon.maxEnergy : pokemon.currentEnergy}
            maxValue={pokemon.maxEnergy}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default PokecenterPokemon;
