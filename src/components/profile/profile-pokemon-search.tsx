import React, { useCallback, useEffect, useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { type Pokemon, type PokemonType } from "@/types/pokemon";
import { Input } from "../ui/primitives/input";
import { Button } from "../ui/primitives/button";
import { typeImages } from "@/images/pokemon-types2/type-images";
import ElementType from "../ui/primitives/element-type";
import { setFilteredPokemons } from "@/store/profile-store";
import { useFilterPokemons } from "@/hooks/use-filter-pokemons";
import { PokemonTypesWithColor } from "./types";

interface FilteredPokemons {
  pokemons: Pokemon[] | null;
}

const ProfilePokemonSearch = ({ pokemons }: { pokemons: Pokemon[] }) => {
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const {
    selectedTypes,
    minLevel,
    setMinLevel,
    maxLevel,
    setMaxLevel,
    name,
    handleTypeSelect,
    handleLevelChange,
    setName,
    clearFilters,
    hasActiveFilters,
  } = useFilterPokemons(pokemons);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching:", {
      types: selectedTypes,
      levels: { min: minLevel, max: maxLevel },
      name,
    });
  };

  return (
    <header className="search-header sticky top-0 z-10 mx-auto h-fit w-full max-w-4xl rounded-md rounded-t-none bg-element-light/20 p-2">
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
                <span className="font-normal text-amber-100">
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
                <div className="absolute z-10 mt-2 w-64 overflow-hidden rounded-sm border border-purple-200/20 bg-primary-dark/95 shadow-md shadow-purple-500/10">
                  <div className="grid grid-cols-3 gap-1 p-2">
                    {PokemonTypesWithColor.map(({ name: type, color }) => (
                      <Button
                        key={type}
                        type="button"
                        size="sm"
                        onClick={() => handleTypeSelect(type as PokemonType)}
                        className={` ${
                          selectedTypes.includes(type as PokemonType)
                            ? `${color} text-white`
                            : "text-amber-50 hover:bg-purple-900/20"
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
              <span className="text-sm text-amber-100">Level:</span>
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
              <span className="text-slate-200">-</span>
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
                className="bg-slate-900 py-1.5 text-amber-100"
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
    </header>
  );
};

export default ProfilePokemonSearch;
function p(value: Pokemon, index: number, array: Pokemon[]): value is Pokemon {
  throw new Error("Function not implemented.");
}
