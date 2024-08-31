interface ExpBarProps {
  expToLevel: number;
  actualExp: number;
}

const ExpBar = ({ expToLevel, actualExp }: ExpBarProps) => {
  return (
    <div className="bar">
      <div
        className="exp-bar"
        style={{
          width: `${(actualExp / expToLevel) * 100}%`,
          maxWidth: "100%",
        }}
      ></div>
    </div>
  );
};

export default ExpBar;
