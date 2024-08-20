import { NpcBattleState } from "@/types/enums/npcBattleState";

interface GenerateBattleButtonProps {
  state: NpcBattleState;
  onButtonClick: () => void;
}

const GenerateBattleButton = ({
  state,
  onButtonClick,
}: GenerateBattleButtonProps) => {
  const getButtonText = (state: NpcBattleState): string => {
    switch (state) {
      case NpcBattleState.NOT_STARTED:
        return "Start Battle";
      case NpcBattleState.BATTLE:
        return "Choose Action";
      case NpcBattleState.PLAYER_TURN:
        return "Attack";
      case NpcBattleState.PLAYER_POKEMON_FAINTED:
        return "Switch Pokémon";
      case NpcBattleState.PLAYER_VICTORY:
      case NpcBattleState.OPPONENT_VICTORY:
      case NpcBattleState.BATTLE_ENDED:
        return "New Battle";
      default:
        return "Continue";
    }
  };
  return (
    <button className="button-primary" onClick={onButtonClick}>
      {getButtonText(state)}
    </button>
  );
};

export default GenerateBattleButton;
