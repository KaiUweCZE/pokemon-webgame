import { Dispatch, SetStateAction, useContext } from "react";

interface TextProps {
  text: string;
  button: boolean;
  setRound: Dispatch<SetStateAction<number>>;
  round: number;
}

const BattleText = ({ text, button, setRound, round }: TextProps) => {
  const handleNextRound = () => {
    setRound((round) => round + 1);
    console.log("round:::: ", round);
  };
  return (
    <div className="battle-text">
      <p>{text}</p>
      {button && (
        <button className="button-primary" onClick={handleNextRound}>
          yes
        </button>
      )}
    </div>
  );
};

export default BattleText;
