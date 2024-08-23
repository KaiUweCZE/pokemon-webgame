import { NpcBattleState } from "@/types/enums/npcBattleState";

export const generateBattleText = (
  state: NpcBattleState,
  userPokemonName?: string,
  opponentPokemonName?: string
): string => {
  switch (state) {
    case NpcBattleState.NOT_STARTED:
      return "Are you ready to start the battle?";
    case NpcBattleState.BATTLE:
      return "The battle has begun!";
    case NpcBattleState.BATTLE_START:
      return `I choose you ${userPokemonName}`;
    case NpcBattleState.USER_ATTACKING:
      return userPokemonName
        ? `${userPokemonName} is attacking!`
        : "Your Pokémon is attacking!";
    case NpcBattleState.OPPONENT_ATTACKING:
      return opponentPokemonName
        ? `${opponentPokemonName} is attacking!`
        : "The opponent's Pokémon is attacking!";
    case NpcBattleState.USER_POKEMON_FAINTED:
      return userPokemonName
        ? `${userPokemonName} has fainted!`
        : "Your Pokémon has fainted!";
    case NpcBattleState.OPPONENT_POKEMON_FAINTED:
      return opponentPokemonName
        ? `${opponentPokemonName} has fainted!`
        : "The opponent's Pokémon has fainted!";
    case NpcBattleState.USER_SWITCHING_POKEMON:
      return "Choose your next Pokémon!";
    case NpcBattleState.OPPONENT_SWITCHING_POKEMON:
      return "The opponent is switching Pokémon!";
    case NpcBattleState.USER_VICTORY:
      return "Congratulations! You've won the battle!";
    case NpcBattleState.OPPONENT_VICTORY:
      return "Oh no! You've lost the battle.";
    case NpcBattleState.BATTLE_ENDED:
      return "The battle has ended.";
    case NpcBattleState.CANNOT_START:
      return "Don't go to matches without pokemon";
    case NpcBattleState.BATTLE_STOPPED:
      return "Do you want to leave a match?";
    default:
      return "...";
  }
};
