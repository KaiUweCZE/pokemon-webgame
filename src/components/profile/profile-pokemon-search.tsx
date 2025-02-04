import React, { useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { PokemonType } from "@/types/pokemon";
import { Input } from "../ui/primitives/input";
import { Button } from "../ui/primitives/button";
import { typeImages } from "@/images/pokemon-types2/type-images";
import ElementType from "../ui/primitives/element-type";

const ProfilePokemonSearch = () => {
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<PokemonType[]>([]);
  const [minLevel, setMinLevel] = useState("");
  const [maxLevel, setMaxLevel] = useState("");
  const [name, setName] = useState("");

  const pokemonTypes = [
    {
      name: "Normal",
      color: "bg-slate-400",
      //image: { src: typeImages.normal.src, alt: typeImages.normal.alt },
    },
    {
      name: "Fire",
      color: "bg-red-500",
      //image: { src: typeImages.fire.src, alt: typeImages.fire.alt },
    },
    {
      name: "Water",
      color: "bg-blue-500",
      //image: { src: typeImages.water.src, alt: typeImages.water.alt },
    },
    {
      name: "Electric",
      color: "bg-yellow-400",
      //image: { src: typeImages.electric.src, alt: typeImages.electric.alt },
    },
    {
      name: "Grass",
      color: "bg-green-500",
      // image: { src: typeImages.grass.src, alt: typeImages.grass.alt },
    },
    {
      name: "Ice",
      color: "bg-cyan-300",
      // image: { src: typeImages.ice.src, alt: typeImages.ice.alt },
    },
    {
      name: "Fighting",
      color: "bg-red-700",
      // image: { src: typeImages.fighting.src, alt: typeImages.fighting.alt },
    },
    {
      name: "Poison",
      color: "bg-purple-500",
      //image: { src: typeImages.poison.src, alt: typeImages.poison.alt },
    },
    {
      name: "Ground",
      color: "bg-yellow-600",
      //image: { src: typeImages.ground.src, alt: typeImages.ground.alt },
    },
    {
      name: "Flying",
      color: "bg-indigo-300",
      //  image: { src: typeImages.flying.src, alt: typeImages.flying.alt },
    },
    {
      name: "Psychic",
      color: "bg-pink-500",
      // image: { src: typeImages.psychic.src, alt: typeImages.psychic.alt },
    },
    {
      name: "Bug",
      color: "bg-lime-500",
      // image: { src: typeImages.bug.src, alt: typeImages.bug.alt },
    },
    {
      name: "Rock",
      color: "bg-yellow-800",
      // image: { src: typeImages.rock.src, alt: typeImages.rock.alt },
    },
    {
      name: "Ghost",
      color: "bg-purple-700",
      // image: { src: typeImages.ghost.src, alt: typeImages.ghost.alt },
    },
    {
      name: "Dragon",
      color: "bg-indigo-600",
      // image: { src: typeImages.dragon.src, alt: typeImages.dragon.alt },
    },
    {
      name: "Dark",
      color: "bg-slate-800",
      //  image: { src: typeImages.dark.src, alt: typeImages.dark.alt },
    },
    {
      name: "Steel",
      color: "bg-slate-500",
      //  image: { src: typeImages.steel.src, alt: typeImages.steel.alt },
    },
    {
      name: "Fairy",
      color: "bg-pink-300",
      // image: { src: typeImages.fairy.src, alt: typeImages.fairy.alt },
    },
  ];

  const handleTypeSelect = (type: PokemonType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else if (selectedTypes.length < 2) {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching:", {
      types: selectedTypes,
      levels: { min: minLevel, max: maxLevel },
      name,
    });
  };

  const handleLevelChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    otherValue: string,
    isMin: boolean
  ) => {
    const numValue = parseInt(value);
    if (value === "" || (numValue >= 1 && numValue <= 100)) {
      if (isMin && maxLevel && numValue > parseInt(maxLevel)) return;
      if (!isMin && minLevel && numValue < parseInt(minLevel)) return;
      setter(value);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl bg-primary p-2">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex flex-col gap-4">
          {/* Search Filters */}
          <div className="flex items-center gap-3">
            {/* Type Filter */}
            <div className="relative">
              <Button
                type="button"
                onClick={() => setIsTypeOpen(!isTypeOpen)}
                className="w-40 max-w-40 justify-between border border-purple-500/20 bg-slate-900/90"
              >
                <span className="font-normal text-slate-400">
                  {selectedTypes.length === 0 ? (
                    "Choose types"
                  ) : (
                    <div className="flex gap-1">
                      {selectedTypes.map((type) => (
                        <ElementType
                          size="xs"
                          key={type}
                          variant={type.toLowerCase() as PokemonType}
                        />
                      ))}
                    </div>
                  )}
                </span>
                <ChevronDown
                  className={`w-4transform h-4 transition-transform duration-200 ${isTypeOpen ? "rotate-180" : ""}`}
                />
              </Button>

              {isTypeOpen && (
                <div className="absolute top-full z-10 mt-2 w-64 overflow-hidden rounded-xl border border-purple-500/20 bg-slate-900/95 shadow-lg shadow-purple-500/10 backdrop-blur-sm transition-all duration-200">
                  <div className="grid grid-cols-3 gap-1 p-2">
                    {pokemonTypes.map(({ name: type, color }) => (
                      <Button
                        key={type}
                        type="button"
                        size="sm"
                        onClick={() => handleTypeSelect(type as PokemonType)}
                        className={` ${
                          selectedTypes.includes(type as PokemonType)
                            ? `${color} text-white`
                            : "text-slate-300 hover:bg-purple-900/20"
                        }`}
                      >
                        <span className="text-sm">{type}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Level Inputs */}
            <div className="flex items-center gap-2 rounded-sm border border-purple-500/20 bg-slate-900/90 px-3 py-1">
              <span className="text-sm text-slate-400">Level:</span>
              <Input
                type="number"
                size="sm"
                variant="secondary"
                placeholder="Min"
                value={minLevel}
                onChange={(e) => handleLevelChange(e.target.value, setMinLevel, maxLevel, true)}
                className=""
                min="1"
                max="100"
              />
              <span className="text-slate-600">-</span>
              <Input
                type="number"
                size="sm"
                variant="secondary"
                placeholder="Max"
                value={maxLevel}
                onChange={(e) => handleLevelChange(e.target.value, setMaxLevel, minLevel, false)}
                min="1"
                max="100"
              />
            </div>

            {/* Name Input */}
            <div className="relative flex-1">
              <Input
                type="text"
                variant="secondary"
                size="sm"
                placeholder="Search by name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-900 py-1.5 text-slate-200"
              />
              <Button
                type="submit"
                variant="basic"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 transform text-slate-400 hover:text-purple-400"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedTypes.length > 0 || minLevel || maxLevel || name) && (
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Active filters:</span>
              <div className="flex flex-wrap items-center gap-2">
                {selectedTypes.map((type) => (
                  <ElementType key={type} variant={type.toLocaleLowerCase() as PokemonType} />
                ))}
                {(minLevel || maxLevel) && (
                  <span className="flex items-center gap-1 rounded-md border border-purple-500/20 bg-purple-900/30 px-2 py-0.5 text-xs text-purple-200">
                    Level: {minLevel || "1"} - {maxLevel || "100"}
                    <Button
                      variant="basic"
                      size="icon"
                      onClick={() => {
                        setMinLevel("");
                        setMaxLevel("");
                      }}
                      className="hover:text-purple-300"
                    >
                      <X size={12} />
                    </Button>
                  </span>
                )}
                {name && (
                  <span className="flex items-center gap-1 rounded-md border border-purple-500/20 bg-purple-900/30 px-2 py-0.5 text-xs text-purple-200">
                    {name}
                    <Button
                      variant="basic"
                      size="icon"
                      onClick={() => setName("")}
                      className="hover:text-purple-300"
                    >
                      <X size={12} />
                    </Button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfilePokemonSearch;
