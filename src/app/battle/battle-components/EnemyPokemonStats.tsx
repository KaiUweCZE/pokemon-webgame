import HpBar from "@/components/HpBar";

interface PokemonStatsProps {
  name: string;
  level: number;
  hp: number;
  actualHp: number;
}

const EnemyPokemonStats: React.FC<PokemonStatsProps> = ({
  name,
  level,
  hp,
  actualHp,
}) => {
  return (
    <div className="box-stats">
      <div className="name-level">
        <span>{name}</span>
        <span>lv.{level}</span>
      </div>
      <div className="bar-wrapper">
        <span>HP</span>
        <HpBar maximumHp={hp} actualHp={actualHp} />
      </div>
    </div>
  );
};

export default EnemyPokemonStats;
