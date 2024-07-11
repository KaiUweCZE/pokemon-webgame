import { Dispatch, SetStateAction } from "react";

interface BattleBagProps {
  setMenuChoice: Dispatch<SetStateAction<string>>;
}

const BattleBag = ({ setMenuChoice }: BattleBagProps) => {
  return (
    <div className="battle-bag">
      <button className="button-primary" onClick={() => setMenuChoice("")}>
        close
      </button>
    </div>
  );
};

export default BattleBag;
