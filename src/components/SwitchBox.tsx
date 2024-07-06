import { Dispatch, SetStateAction } from "react";

interface SwitchBoxProps {
  setMenuChoice: Dispatch<SetStateAction<string>>;
}

const SwitchBox = ({ setMenuChoice }: SwitchBoxProps) => {
  return (
    <div className="switch-box">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <button className="button-primary" onClick={() => setMenuChoice("")}>
        close
      </button>
    </div>
  );
};

export default SwitchBox;
