import { BattleContext } from "@/contexts/BattleContext";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useContext } from "react";

interface TextProps {
  text: string;
  button: boolean;
  setRound: Dispatch<SetStateAction<number>>;
  round: number;
}

const BattleText = ({ text, button, setRound, round }: TextProps) => {
  const context = useContext(BattleContext);
  const router = useRouter();
  const handleNextRound = () => {
    context?.setIsCatching({ underway: false, isSucces: false });
    setRound((round) => round + 1);

    console.log("round:::: ", round);
  };
  return (
    <div className="battle-text">
      <p>{text}</p>
      {button && (
        <div>
          <button className="button-primary" onClick={handleNextRound}>
            yes
          </button>
          <button
            className="button-primary"
            onClick={() => {
              router.push("/map");
            }}
          >
            no
          </button>
        </div>
      )}
    </div>
  );
};

export default BattleText;
