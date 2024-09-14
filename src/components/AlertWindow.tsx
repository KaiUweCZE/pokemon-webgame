import { SetStateAction } from "jotai";
import { Dispatch } from "react";

interface AlertWindowProps {
  message: string;
  onClickUtil: any;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

const AlertWindow = ({
  message,
  active,
  setActive,
  onClickUtil,
}: AlertWindowProps) => {
  return (
    <div className="alert-window">
      <p>{message}</p>
      <div className="flex-row">
        <button className="button-primary" onClick={onClickUtil}>
          yes
        </button>
        <button className="button-primary" onClick={() => setActive(false)}>
          no
        </button>
      </div>
    </div>
  );
};

export default AlertWindow;
