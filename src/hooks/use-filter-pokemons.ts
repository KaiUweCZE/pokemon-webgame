import { setFilteredPokemons } from "@/store/profile-store";
import { Pokemon, PokemonName, PokemonType } from "@/types/pokemon";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "./use-debounce";

export type FilteredPokemon = {
  name: PokemonName;
  types: PokemonType[];
  level?: number;
};

export type FilterablePokemon = {
  name: PokemonName;
  types: PokemonType[];
  level?: number;
};

export interface PokemonFilters {
  types: PokemonType[];
  minLevel: string;
  maxLevel: string;
  name: string;
}

export const useFilterPokemons = <T extends FilterablePokemon>(pokemons: T[]) => {
  const [filters, setFilters] = useState<PokemonFilters>({
    types: [],
    minLevel: "",
    maxLevel: "",
    name: "",
  });

  const debouncedMinLevel = useDebounce(filters.minLevel, 500);
  const debouncedMaxLevel = useDebounce(filters.maxLevel, 500);

  const hasActiveFilters = filters.types.length > 0 || filters.minLevel || filters.maxLevel;

  const handleTypeSelect = (type: PokemonType) => {
    setFilters((prev) => {
      if (prev.types.includes(type)) {
        return {
          ...prev,
          types: prev.types.filter((t) => t !== type),
        };
      } else if (prev.types.length < 2) {
        return {
          ...prev,
          types: [...prev.types, type],
        };
      }
      return prev;
    });
  };

  const handleLevelChange = (value: string, type: "minLevel" | "maxLevel") => {
    if (value === "" || /^\d{0,3}$/.test(value)) {
      setFilters((prev) => ({
        ...prev,
        [type]: value,
      }));
    }
  };

  const handleNameChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      name: value,
    }));
  };

  // Filter pokemons
  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pokemon) => {
      // If it has no level, it is considered compliant (for compatibility)
      if (!pokemon.level && (filters.minLevel || filters.maxLevel)) return true;

      // Filtering by type - must contain at least one of the selected types
      const typeMatch =
        filters.types.length === 0 || pokemon.types.some((type) => filters.types.includes(type));

      // Filterin by level
      const minLevelNum = parseInt(filters.minLevel) || 1;
      const maxLevelNum = parseInt(filters.maxLevel) || 100;
      const levelMatch =
        !pokemon.level || (pokemon.level >= minLevelNum && pokemon.level <= maxLevelNum);

      // Filtering by name
      const nameMatch =
        !filters.name || pokemon.name.toLowerCase().includes(filters.name.toLowerCase());

      return typeMatch && levelMatch && nameMatch;
    });
  }, [pokemons, filters]);

  useEffect(() => {
    if (!debouncedMinLevel || !debouncedMaxLevel) return;

    const minNum = parseInt(debouncedMinLevel);
    const maxNum = parseInt(debouncedMaxLevel);

    if (minNum > maxNum) {
      setFilters((prev) => ({
        ...prev,
        minLevel: debouncedMaxLevel,
      }));
    }
  }, [debouncedMinLevel, debouncedMaxLevel]);

  const clearFilters = useCallback(() => {
    setFilters({
      types: [],
      minLevel: "",
      maxLevel: "",
      name: "",
    });
  }, []);

  return {
    filters,
    filteredPokemons,
    handleTypeSelect,
    handleLevelChange,
    handleNameChange,
    clearFilters,
    hasActiveFilters,
  };
};
