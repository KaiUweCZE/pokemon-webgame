import { useEffect, useContext } from "react";
import { PokemonBattle } from "@/types/pokemonBattle";
import { Pokemon } from "@/types/pokemon";
import { NpcBattleContext } from "../NpcBattleContext";
import { BattleState } from "@/types/enums/battleState";

export const useBattleState = (
  userPokemons: Pokemon[] | null,
  opponentPokemons: PokemonBattle[] | null,
  userPokemon: PokemonBattle | null,
  currentOpponentPokemon: PokemonBattle | null
) => {
  const context = useContext(NpcBattleContext);
  if (!context) {
    throw Error("context is missing");
  }
  const { battleState, setBattleState } = context;

  // check if some of user's pokemon are ready to fight
  useEffect(() => {
    if (battleState === BattleState.NOT_STARTED) {
      if (
        userPokemons &&
        !userPokemons.some((pokemon) => pokemon.actualHp > 0)
      ) {
        setBattleState(BattleState.CANNOT_START);
      }
    }
  }, []);

  // Tracks the health of current Pokémon and updates battle status
  // when a Pokémon faints or when one side loses all Pokémon
  useEffect(() => {
    if (!userPokemon || !currentOpponentPokemon) return;
    const getBattleState = (): BattleState | null => {
      switch (true) {
        case userPokemon.actualHp <= 0:
          console.log("user pokemons: ", userPokemons);

          if (
            userPokemons &&
            userPokemons.some((pokemon) => pokemon.actualHp > 0)
          ) {
            return BattleState.USER_POKEMON_FAINTED;
          } else {
            return BattleState.OPPONENT_VICTORY;
          }

        case currentOpponentPokemon.actualHp <= 0:
          console.log("ouha");
          if (opponentPokemons?.some((pokemon) => pokemon.actualHp > 0)) {
            return BattleState.OPPONENT_POKEMON_FAINTED;
          } else {
            return BattleState.USER_VICTORY;
          }

        default:
          return null;
      }
    };

    const newState = getBattleState();
    if (newState) {
      setBattleState(newState);
    }
  }, [userPokemon, currentOpponentPokemon, userPokemons, opponentPokemons]);

  return { battleState, setBattleState };
};
