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
      >
        {/*{actualHp}/{maximumHp}*/}
      </div>
    </div>
  );
};

export default HpBar;
