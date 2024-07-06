interface HpProps {
  maximumHp: number;
  actualHp: number;
}

const HpBar = ({ maximumHp, actualHp }: HpProps) => {
  return (
    <div className="bar">
      <div
        className="hp-bar"
        style={{ width: `${(actualHp / maximumHp) * 100}%` }}
      ></div>
    </div>
  );
};

export default HpBar;
