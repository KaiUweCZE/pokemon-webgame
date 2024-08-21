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

  // check if some of user's pokemon are ready to fight
  useEffect(() => {
    if (battleState === NpcBattleState.NOT_STARTED) {
      if (!userPokemons.some((pokemon) => pokemon.actualHp > 0)) {
        setBattleState(NpcBattleState.CANNOT_START);
      }
    }
  }, []);

  // Tracks the health of current Pokémon and updates battle status
  // when a Pokémon faints or when one side loses all Pokémon
  useEffect(() => {
    if (!currentPokemon || !currentOpponentPokemon) return;
    const getBattleState = (): NpcBattleState | null => {
      switch (true) {
        case currentPokemon.actualHp <= 0:
          console.log("user pokemons: ", userPokemons);

          if (userPokemons.some((pokemon) => pokemon.actualHp > 0)) {
            return NpcBattleState.PLAYER_POKEMON_FAINTED;
          } else {
            return NpcBattleState.OPPONENT_VICTORY;
          }

        case currentOpponentPokemon.actualHp <= 0:
          if (opponentPokemons?.some((pokemon) => pokemon.actualHp > 0)) {
            return NpcBattleState.OPPONENT_POKEMON_FAINTED;
          } else {
            return NpcBattleState.PLAYER_VICTORY;
          }

        default:
          return null;
      }
    };

    const newState = getBattleState();
    if (newState) {
      setBattleState(newState);
    }
  }, [currentPokemon, currentOpponentPokemon, userPokemons, opponentPokemons]);

  return { battleState, setBattleState };
};
