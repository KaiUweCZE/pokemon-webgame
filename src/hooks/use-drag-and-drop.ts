import { useState, useCallback } from "react";
import { Pokemon } from "@/types/pokemon";
import { pokemonsImg } from "@/images";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/providers/toast-context";
import { pokemonSwap } from "@/utils/actions/pokemon-swap";

interface ActivePokemon {
  pokemon: Pokemon;
  image: (typeof pokemonsImg)[keyof typeof pokemonsImg];
}

export const usePokemonDragAndDrop = (initialActiveIds: string[], userPokemons: Pokemon[]) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [activePokemon, setActivePokemon] = useState<(ActivePokemon | null)[]>(() => {
    return initialActiveIds.map((id) => {
      const pokemon = userPokemons.find((p) => p.id === id);
      if (!pokemon) return null;
      return {
        pokemon,
        image: pokemonsImg[pokemon.name as keyof typeof pokemonsImg],
      };
    });
  });

  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateMutation = useMutation({
    mutationFn: async (newActivePokemon: (ActivePokemon | null)[]) => {
      const newActiveIds = newActivePokemon
        .filter((item): item is ActivePokemon => item !== null)
        .map((item) => item.pokemon.id);

      return await pokemonSwap(newActiveIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      showToast("Pokemon order updated", "success");
    },
    onError: (error) => {
      showToast(error instanceof Error ? error.message : "Failed to update Pokemon order", "error");
    },
  });

  const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault();

      if (draggedIndex === null) return;

      setActivePokemon((prevPokemon) => {
        const newPokemon = [...prevPokemon];
        const draggedPokemon = newPokemon[draggedIndex];

        newPokemon.splice(draggedIndex, 1);
        newPokemon.splice(dropIndex, 0, draggedPokemon);

        updateMutation.mutate(newPokemon);

        return newPokemon;
      });

      setDraggedIndex(null);
    },
    [draggedIndex, updateMutation]
  );

  return {
    activePokemon,
    draggedIndex,
    handleDragStart,
    handleDragOver,
    handleDrop,
    isUpdating: updateMutation.isPending,
  };
};
