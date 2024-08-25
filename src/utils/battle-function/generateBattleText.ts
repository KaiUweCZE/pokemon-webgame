import { BattleState } from "@/types/enums/battleState";
import { Item } from "@/types/item";

export const generateBattleText = (
  state: BattleState,
  userPokemonName?: string,
  opponentPokemonName?: string,
  exps?: number,
  reward?: Item | null
): string => {
  switch (state) {
    case BattleState.NOT_STARTED:
      return "Are you ready to start the battle?";
    case BattleState.BATTLE:
      return "The battle has begun!";
    case BattleState.BATTLE_START:
      return `I choose you ${userPokemonName}`;
    case BattleState.USER_ATTACKING:
      return userPokemonName
        ? `${userPokemonName} is attacking!`
        : "Your Pokémon is attacking!";
    case BattleState.OPPONENT_ATTACKING:
      return opponentPokemonName
        ? `${opponentPokemonName} is attacking!`
        : "The opponent's Pokémon is attacking!";
    case BattleState.USER_POKEMON_FAINTED:
      return userPokemonName
        ? `${userPokemonName} has fainted!`
        : "Your Pokémon has fainted!";
    case BattleState.WILD_POKEMON_APPEAR:
      return opponentPokemonName
        ? `${opponentPokemonName} has appaered`
        : "oh man who is it?";
    case BattleState.WILD_POKEMON_FAINTED:
      return opponentPokemonName && exps && reward
        ? `${opponentPokemonName} fainted, you obtain ${exps} exp. and ${reward.name}: ${reward.count} do you want to continue?`
        : "ou, you won";
    case BattleState.CATCHING:
      return "Pokeball go";
    case BattleState.CAUGHT:
      return opponentPokemonName
        ? `you caught ${opponentPokemonName}, do you want to continue?`
        : "you caught it, do you want to continue?";
    case BattleState.OPPONENT_POKEMON_FAINTED:
      return opponentPokemonName
        ? `${opponentPokemonName} has fainted!`
        : "The opponent's Pokémon has fainted!";
    case BattleState.USER_SWITCHING_POKEMON:
      return "Choose your next Pokémon!";
    case BattleState.OPPONENT_SWITCHING_POKEMON:
      return "The opponent is switching Pokémon!";
    case BattleState.USER_VICTORY:
      return "Congratulations! You've won the battle!";
    case BattleState.OPPONENT_VICTORY:
      return "Oh no! You've lost the battle.";
    case BattleState.BATTLE_ENDED:
      return "The battle has ended.";
    case BattleState.CANNOT_START:
      return "Don't go to matches without pokemon";
    case BattleState.BATTLE_STOPPED:
      return "Do you want to leave a match?";
    case BattleState.LAST_ROUND_DONE:
      return "Ok, it is time to go back";
    default:
      return "...";
  }
};
