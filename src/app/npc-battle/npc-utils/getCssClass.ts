import { NpcBattleState } from "@/types/enums/npcBattleState";

export const getCssClass = (
  baseClass: string,
  battleState: NpcBattleState
): string => {
  const cssClasses = [baseClass];

  switch (battleState) {
    case NpcBattleState.PLAYER_POKEMON_FAINTED:
      cssClasses.push("user-done");
      break;
    case NpcBattleState.BATTLE_START:
      cssClasses.push("start");
      break;
    case NpcBattleState.OPPONENT_SWITCHING_POKEMON:
      cssClasses.push("oponent-switching");
      break;
    case NpcBattleState.PLAYER_SWITCHING_POKEMON:
      cssClasses.push("user-switching");
      break;
    case NpcBattleState.PLAYER_ATTACKING:
      cssClasses.push("attacking");
      break;
    case NpcBattleState.OPPONENT_ATTACKING:
      cssClasses.push("defending");
      break;
    case NpcBattleState.PLAYER_VICTORY:
      cssClasses.push("victory");
      break;
    case NpcBattleState.OPPONENT_VICTORY:
      cssClasses.push("defeat");
      break;
    case NpcBattleState.BATTLE:
      break;
    default:
      cssClasses.push("not-started");
      break;
  }

  return cssClasses.join(" ");
};
