import HpBar from "@/components/HpBar";
import EnergyBar from "@/components/EnergyBar";
import ExpBar from "@/components/ExpBar";

interface UserPokemonStatsProps {
  name: string;
  level: number;
  hp: number;
  actualHp: number;
  energy: number;
  actualEnergy: number;
  actualExp?: number;
  expToLevel?: number;
}

const UserPokemonStats: React.FC<UserPokemonStatsProps> = ({
  name,
  level,
  hp,
  actualHp,
  energy,
  actualEnergy,
  actualExp,
  expToLevel,
}) => {
  return (
    <div className="box-stats">
      <div className="name-level">
        <span>{name}</span>
        <span>lv.{level}</span>
      </div>
      <div className="box-bars">
        <div className="bar-wrapper">
          <span>HP</span>
          <HpBar actualHp={actualHp} maximumHp={hp} />
        </div>
        <div className="bar-wrapper">
          <span>EN</span>
          <EnergyBar actualEnergy={actualEnergy} maximumEnergy={energy} />
        </div>
      </div>
      {/*actualExp !== undefined && expToLevel !== undefined && (
        <ExpBar
          actualExp={actualExp}
          expToLevel={expToLevel}
        />
      )*/}
    </div>
  );
};

export default UserPokemonStats;
