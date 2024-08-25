import { BattleState } from "@/types/enums/battleState";

interface GenerateBattleButtonProps {
  state: BattleState;
  onButtonClick: () => void;
}

const GenerateBattleButton = ({
  state,
  onButtonClick,
}: GenerateBattleButtonProps) => {
  const getButtonText = (state: BattleState): string | null => {
    switch (state) {
      case BattleState.NOT_STARTED:
        return "Start Battle";
      case BattleState.BATTLE:
        return "Choose Action";
      case BattleState.BATTLE_STOPPED:
        return "Leave";
      case BattleState.USER_POKEMON_FAINTED:
        return "Switch Pokémon";
      case BattleState.WILD_POKEMON_APPEAR:
        return "Start Battle";
      case BattleState.WILD_POKEMON_FAINTED:
        return "Yes";
      case BattleState.CAUGHT:
        return "Yes";
      case BattleState.USER_VICTORY:
      case BattleState.OPPONENT_VICTORY:
      case BattleState.BATTLE_ENDED:
        return "New Battle";
      case BattleState.CANNOT_START:
      case BattleState.LAST_ROUND_DONE:
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
