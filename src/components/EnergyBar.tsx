interface EnergyBarProps {
  maximumEnergy: number;
  actualEnergy: number;
}

const EnergyBar = ({ maximumEnergy, actualEnergy }: EnergyBarProps) => {
  return (
    <div className="bar">
      <div
        className="energy-bar"
        style={{ width: `${(actualEnergy / maximumEnergy) * 100}%` }}
      ></div>
    </div>
  );
};

export default EnergyBar;
