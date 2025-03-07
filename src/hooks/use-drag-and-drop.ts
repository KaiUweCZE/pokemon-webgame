import { useState, useCallback, useEffect } from "react";
import { Pokemon } from "@/types/pokemon";
import { pokemonsImg } from "@/images";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/providers/toast-provider";
import { pokemonSwap } from "@/utils/actions/pokemon-swap";
import { useBattleStore } from "@/store/battle/battle-store";
import { setUserPokemonSix } from "@/store/battle/actions/battle-pokemon-actions";

interface ActivePokemon {
  pokemon: Pokemon;
  image: (typeof pokemonsImg)[keyof typeof pokemonsImg];
}

export const usePokemonDragAndDrop = () => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { userPokemonSix } = useBattleStore();
  const { showToast } = useToast();

  const updateMutation = useMutation({
    mutationFn: async (newPokemonTeam: Pokemon[]) => {
      const newActiveIds = newPokemonTeam.map((pokemon) => pokemon.id);
      return await pokemonSwap(newActiveIds);
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      showToast(error instanceof Error ? error.message : "Failed to update Pokemon order", "error");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
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

      const newTeam = [...userPokemonSix];
      const draggedPokemon = newTeam[draggedIndex];

      newTeam.splice(draggedIndex, 1);
      newTeam.splice(dropIndex, 0, draggedPokemon);

      setUserPokemonSix(newTeam);

      updateMutation.mutate(newTeam);

      setDraggedIndex(null);
    },
    [draggedIndex, updateMutation, userPokemonSix]
  );

  return {
    draggedIndex,
    handleDragStart,
    handleDragOver,
    handleDrop,
    isUpdating: updateMutation.isPending,
  };
};
