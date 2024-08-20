import { NpcBattleState } from "@/types/enums/npcBattleState";

export const generateBattleText = (
  state: NpcBattleState,
  playerPokemonName?: string,
  opponentPokemonName?: string
): string => {
  switch (state) {
    case NpcBattleState.NOT_STARTED:
      return "Are you ready to start the battle?";
    case NpcBattleState.BATTLE:
      return "The battle has begun!";
    case NpcBattleState.PLAYER_TURN:
      return "It's your turn. Choose your move!";
    case NpcBattleState.OPPONENT_TURN:
      return "Your opponent is thinking...";
    case NpcBattleState.PLAYER_ATTACKING:
      return playerPokemonName
        ? `${playerPokemonName} is attacking!`
        : "Your Pokémon is attacking!";
    case NpcBattleState.OPPONENT_ATTACKING:
      return opponentPokemonName
        ? `${opponentPokemonName} is attacking!`
        : "The opponent's Pokémon is attacking!";
    case NpcBattleState.PLAYER_POKEMON_FAINTED:
      return playerPokemonName
        ? `${playerPokemonName} has fainted!`
        : "Your Pokémon has fainted!";
    case NpcBattleState.OPPONENT_POKEMON_FAINTED:
      return opponentPokemonName
        ? `${opponentPokemonName} has fainted!`
        : "The opponent's Pokémon has fainted!";
    case NpcBattleState.PLAYER_SWITCHING_POKEMON:
      return "Choose your next Pokémon!";
    case NpcBattleState.OPPONENT_SWITCHING_POKEMON:
      return "The opponent is switching Pokémon!";
    case NpcBattleState.PLAYER_VICTORY:
      return "Congratulations! You've won the battle!";
    case NpcBattleState.OPPONENT_VICTORY:
      return "Oh no! You've lost the battle.";
    case NpcBattleState.BATTLE_ENDED:
      return "The battle has ended.";
    default:
      return "...";
  }
};
