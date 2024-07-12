import { Dispatch, SetStateAction } from "react";

interface MapErrorProps {
  setError: Dispatch<SetStateAction<boolean>>;
}

const MapError = ({ setError }: MapErrorProps) => {
  return (
    <div className="map-error">
      <p>We will leave that for tomorrow</p>
      <button className="button-primary" onClick={() => setError(false)}>
        close
      </button>
    </div>
  );
};

export default MapError;
