import { setFilteredPokemons } from "@/store/profile-store";
import { Pokemon, PokemonType } from "@/types/pokemon";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "./use-debounce";

export const useFilterPokemons = (pokemons: Pokemon[]) => {
  const [selectedTypes, setSelectedTypes] = useState<PokemonType[]>([]);
  const [minLevel, setMinLevel] = useState("");
  const [maxLevel, setMaxLevel] = useState("");
  const [name, setName] = useState("");

  const debouncedMinLevel = useDebounce(minLevel, 500);
  const debouncedMaxLevel = useDebounce(maxLevel, 500);

  const hasActiveFilters = selectedTypes.length > 0 || minLevel || maxLevel || name;

  const handleTypeSelect = (type: PokemonType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else if (selectedTypes.length < 2) {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleLevelChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    otherValue: string,
    isMin: boolean
  ) => {
    if (value === "" || /^\d{0,3}$/.test(value)) {
      // Then just set the value - the debounce hook will handle the delay
      setter(value);
    }
  };

  const filterPokemons = useCallback(
    (pokemons: Pokemon[]) => {
      return pokemons.filter((pokemon) => {
        // Type filtering
        const typeMatch =
          selectedTypes.length === 0 || pokemon.types.some((type) => selectedTypes.includes(type));

        // Level filtering
        const minLevelNum = parseInt(minLevel) || 1;
        const maxLevelNum = parseInt(maxLevel) || 100;
        const levelMatch = pokemon.level >= minLevelNum && pokemon.level <= maxLevelNum;

        // Name filtering
        const nameMatch = !name || pokemon.name.toLowerCase().includes(name.toLowerCase());

        return typeMatch && levelMatch && nameMatch;
      });
    },
    [selectedTypes, minLevel, maxLevel, name]
  );

  const handleSetLevelRange = (type: "min" | "max", value: string) => {
    if (type === "min") {
      setMinLevel(value);
    } else if (type === "max") {
      setMaxLevel(value);
    }
  };

  useEffect(() => {
    const filteredResults = filterPokemons(pokemons);
    setFilteredPokemons(filteredResults);
  }, [filterPokemons]);

  /* debounce for situations where is minLevel set
    for example: minLevel = 10
    so without debounce we can not set max level for ex 25,
    because utils restrict first number (2)
  */
  useEffect(() => {
    // Now we can validate the debounced values
    const minNum = parseInt(debouncedMinLevel);
    const maxNum = parseInt(debouncedMaxLevel);

    // If the validation fails, we can reset the values
    if (debouncedMinLevel && maxLevel && minNum > parseInt(maxLevel)) {
      setMinLevel(maxLevel);
    }
    if (debouncedMaxLevel && minLevel && maxNum < parseInt(minLevel)) {
      setMaxLevel(minLevel);
    }
  }, [debouncedMinLevel, debouncedMaxLevel]);

  const clearFilters = useCallback(() => {
    setSelectedTypes([]);
    setMinLevel("");
    setMaxLevel("");
    setName("");
  }, []);

  return {
    selectedTypes,
    setSelectedTypes,
    minLevel,
    setMinLevel,
    maxLevel,
    setMaxLevel,
    name,
    setName,
    handleTypeSelect,
    handleLevelChange,
    clearFilters,
    hasActiveFilters,
    handleSetLevelRange,
  };
};
