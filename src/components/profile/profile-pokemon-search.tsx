import React, { useCallback, useEffect, useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { type Pokemon, type PokemonType } from "@/types/pokemon";
import { Input } from "../ui/primitives/input";
import { Button } from "../ui/primitives/button";
import ElementType from "../ui/primitives/element-type";
import { useFilterPokemons } from "@/hooks/use-filter-pokemons";
import { PokemonTypesWithColor } from "./types";
import { setFilteredPokemons } from "@/store/profile-store";
import TypeFilter from "../ui/specific/type-filter";

interface FilteredPokemons {
  pokemons: Pokemon[] | null;
}

const ProfilePokemonSearch = ({ pokemons }: { pokemons: Pokemon[] }) => {
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const {
    filters,
    filteredPokemons,
    handleTypeSelect,
    handleLevelChange,
    handleNameChange,
    clearFilters,
    hasActiveFilters,
  } = useFilterPokemons(pokemons);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching:", {
      types: filters.types,
      levels: { min: filters.minLevel, max: filters.maxLevel },
      name: filters.name,
    });
    setFilteredPokemons(filteredPokemons);
  };

  useEffect(() => {
    setFilteredPokemons(filteredPokemons);
  }, [handleLevelChange, handleTypeSelect, handleNameChange]);

  return (
    <header className="search-header sticky top-0 z-10 mx-auto h-fit w-full max-w-4xl rounded-md rounded-t-none bg-element-light/20 p-2">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex flex-col gap-4">
          {/* Search Filters */}
          <div className="flex items-center gap-3">
            {/* Type Filter */}
            <TypeFilter
              filtersType={filters.types}
              isTypeOpen={isTypeOpen}
              setIsTypeOpen={setIsTypeOpen}
              handleTypeSelect={handleTypeSelect}
              className="w-40 max-w-full justify-between border border-purple-500/20 bg-slate-900/90"
            />

            {/* Level Inputs */}
            <div className="flex items-center gap-2 rounded-sm border border-purple-500/20 bg-slate-900/90 px-3 py-1">
              <span className="text-sm text-amber-100">Level:</span>
              <Input
                type="number"
                size="sm"
                variant="secondary"
                placeholder="Min"
                value={filters.minLevel}
                onChange={(e) => handleLevelChange(e.target.value, "minLevel")}
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
                value={filters.maxLevel}
                onChange={(e) => handleLevelChange(e.target.value, "maxLevel")}
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
                value={filters.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="bg-slate-900 py-1.5 text-amber-100"
              />
              <Button
                type="submit"
                variant="basic"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 transform text-slate-400 hover:text-purple-400"
              >
                <Search className="h-4 w-4" onClick={() => console.log(filteredPokemons)} />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Active filters:</span>
              <div className="flex flex-wrap items-center gap-2">
                {filters.types.map((type) => (
                  <ElementType key={type} variant={type.toLocaleLowerCase() as PokemonType} />
                ))}
                {(filters.minLevel || filters.maxLevel) && (
                  <span className="flex items-center gap-1 rounded-md border border-purple-500/20 bg-purple-900/30 px-2 py-0.5 text-xs text-purple-200">
                    Level: {filters.minLevel || "1"} - {filters.maxLevel || "100"}
                    <Button
                      variant="basic"
                      size="icon"
                      onClick={() => {
                        handleLevelChange("", "minLevel");
                        handleLevelChange("", "maxLevel");
                      }}
                      className="hover:text-purple-300"
                    >
                      <X size={12} />
                    </Button>
                  </span>
                )}
                {filters.name && (
                  <span className="flex items-center gap-1 rounded-md border border-purple-500/20 bg-purple-900/30 px-2 py-0.5 text-xs text-purple-200">
                    {filters.name}
                    <Button
                      variant="basic"
                      size="icon"
                      onClick={() => handleNameChange("")}
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
