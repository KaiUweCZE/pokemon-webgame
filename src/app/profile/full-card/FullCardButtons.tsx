interface FullCardButtonsProps {
  onAddToSix: () => void;
  onDelete: () => void;
  onEvolve?: () => Promise<void>;
  canEvolve: boolean;
}

const FullCardButtons = ({
  onAddToSix,
  onDelete,
  onEvolve,
  canEvolve,
}: FullCardButtonsProps) => (
  <div className="box-buttons">
    <button className="button-primary" onClick={onAddToSix}>
      To six
    </button>
    <button className="button-primary" onClick={onDelete}>
      delete
    </button>
    {canEvolve && (
      <button className="button-primary" onClick={onEvolve}>
        evolve
      </button>
    )}
  </div>
);

export default FullCardButtons;
