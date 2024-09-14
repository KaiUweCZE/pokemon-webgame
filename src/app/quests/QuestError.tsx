import closeIcon from "@/assets/images/icons/close.svg";
import { SetStateAction } from "jotai";
import Image from "next/image";
import { Dispatch } from "react";

interface QuestErrorProps {
  error: string;
  setError: Dispatch<SetStateAction<string>>;
}

const QuestError = ({ error, setError }: QuestErrorProps) => {
  const handleClick = () => {
    console.log("what?");
    setError("");
  };
  return (
    <div className="quest-error">
      <p>{error}</p>
      <button className="button-primary" onClick={handleClick}>
        close
      </button>
    </div>
  );
};

export default QuestError;
