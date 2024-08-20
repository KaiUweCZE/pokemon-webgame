import { useState, useEffect, useContext } from "react";
import { PokemonBattle } from "@/types/pokemonBattle";
import { Pokemon } from "@/types/pokemon";
import { NpcBattleContext } from "../NpcBattleContext";
import { NpcBattleState } from "@/types/enums/npcBattleState";

export const useBattleState = (
  userPokemons: Pokemon[],
  opponentPokemons: PokemonBattle[] | null,
  currentPokemon: PokemonBattle | null,
  currentOpponentPokemon: PokemonBattle | null
) => {
  const context = useContext(NpcBattleContext);
  if (!context) {
    throw Error("context is missing");
  }
  const { battleState, setBattleState } = context;

  // Tracks the health of current Pokémon and updates battle status
  // when a Pokémon faints or when one side loses all Pokémon
  useEffect(() => {
    if (currentPokemon && currentOpponentPokemon) {
      if (currentPokemon.actualHp <= 0) {
        if (userPokemons.some((pokemon) => pokemon.actualHp > 0)) {
          setBattleState(NpcBattleState.PLAYER_POKEMON_FAINTED);
        } else {
          setBattleState(NpcBattleState.OPPONENT_VICTORY);
        }
      } else if (currentOpponentPokemon.actualHp <= 0) {
        if (opponentPokemons?.some((pokemon) => pokemon.actualHp > 0)) {
          setBattleState(NpcBattleState.OPPONENT_POKEMON_FAINTED);
        } else {
          setBattleState(NpcBattleState.PLAYER_VICTORY);
        }
      }
    }
  }, [currentPokemon, currentOpponentPokemon, userPokemons, opponentPokemons]);

  return { battleState, setBattleState };
};
