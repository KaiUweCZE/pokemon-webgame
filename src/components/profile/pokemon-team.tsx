import React, { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePokemonDragAndDrop } from "@/hooks/use-drag-and-drop";
import PokemonTeamSlot from "./pokemon-team-slot";
import "@/styles/profile.css";
import { useRemoveFromTeam } from "@/hooks/profile/use-remove-from-team";
import { useBattleStore } from "@/store/battle/battle-store";
import { setUserPokemonSix } from "@/store/battle/actions/battle-pokemon-actions";
import { pokemonsImg } from "@/images";

const PokemonTeam = () => {
  const { data: user } = useCurrentUser();
  const { userPokemonSix } = useBattleStore();
  const [isHover, setIsHover] = useState(false);
  const { draggedIndex, handleDragStart, handleDragOver, handleDrop } = usePokemonDragAndDrop();

  useEffect(() => {
    if (user && userPokemonSix.length === 0) {
      const activePokemons = user?.pokemons.filter((pokemon) => pokemon.isActive);
      setUserPokemonSix(activePokemons);
    }
  }, [user]);

  const { isRemoving, removePokemon } = useRemoveFromTeam();

  if (!user) return null;

  // ui format of pokemon team
  const pokemonTeam = userPokemonSix.map((pokemon, index) => ({
    pokemon,
    image: pokemonsImg[pokemon.name as keyof typeof pokemonsImg],
  }));

  const handleRemovePokemon = (pokemonId: string) => {
    if (isRemoving) return;
    removePokemon(pokemonId);
  };

  return (
    <div className="pokemon-team gap-2 rounded-sm border border-purple-300 bg-primary-dark/85 p-2 shadow-secondary">
      {Array.from({ length: 6 }).map((_, index) => {
        const currentPokemon = pokemonTeam?.[index];
        return (
          <PokemonTeamSlot
            key={currentPokemon?.pokemon?.id ?? index}
            pokemon={currentPokemon?.pokemon ?? null}
            image={currentPokemon?.image ?? null}
            index={index}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            isDragging={draggedIndex === index}
            onRemove={handleRemovePokemon}
          />
        );
      })}
      <div className="pokemon-team-hint rounded-sm bg-primary-dark/85 p-1 px-2 text-xs text-amber-100/70 shadow-secondary">
        Drag to reorder • Hover for details
      </div>
    </div>
  );
};

export default PokemonTeam;
