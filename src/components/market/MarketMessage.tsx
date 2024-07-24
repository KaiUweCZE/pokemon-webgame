import { Dispatch, SetStateAction } from "react";

interface MarketMessageProps {
  setError: Dispatch<SetStateAction<boolean>>;
}

const MarketMessage = ({ setError }: MarketMessageProps) => {
  return (
    <div className="market-message">
      <p>This trade cannot be done</p>
      <button className="button-primary" onClick={() => setError(false)}>
        close
      </button>
    </div>
  );
};

export default MarketMessage;
