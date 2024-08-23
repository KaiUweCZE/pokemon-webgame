import { NpcBattleState } from "@/types/enums/npcBattleState";

interface GenerateBattleButtonProps {
  state: NpcBattleState;
  onButtonClick: () => void;
}

const GenerateBattleButton = ({
  state,
  onButtonClick,
}: GenerateBattleButtonProps) => {
  const getButtonText = (state: NpcBattleState): string | null => {
    switch (state) {
      case NpcBattleState.NOT_STARTED:
        return "Start Battle";
      case NpcBattleState.BATTLE:
        return "Choose Action";
      case NpcBattleState.BATTLE_STOPPED:
        return "Leave";
      case NpcBattleState.USER_POKEMON_FAINTED:
        return "Switch Pokémon";
      case NpcBattleState.USER_VICTORY:
      case NpcBattleState.OPPONENT_VICTORY:
      case NpcBattleState.BATTLE_ENDED:
        return "New Battle";
      case NpcBattleState.CANNOT_START:
        return "Go Home";
      default:
        return null;
    }
  };

  const buttonText = getButtonText(state);

  return (
    <>
      {buttonText && (
        <button className="button-primary" onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </>
  );
};

export default GenerateBattleButton;
