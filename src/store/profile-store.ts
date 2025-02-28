"use client";
import { Store } from "@tanstack/store";
import { useStore } from "@tanstack/react-store";
import { Pokemon } from "@/types/pokemon";
import { FilteredPokemon } from "@/hooks/use-filter-pokemons";

interface ProfileStore {
  filteredPokemons: FilteredPokemon[] | null;
}

interface FilteredOptions {
  name?: string;
  type?: string[];
  level: {
    min?: number;
    max?: number;
  };
}

export const profileStore = new Store<ProfileStore>({
  filteredPokemons: null,
});

export const setFilteredPokemons = (pokemons: FilteredPokemon[]) => {
  profileStore.setState((state) => ({
    filteredPokemons: pokemons,
  }));
};

export const useProfileStore = () => {
  const state = useStore(profileStore);
  return {
    ...state,
    profileStore,
    filteredPokemons: state.filteredPokemons,
  };
};
