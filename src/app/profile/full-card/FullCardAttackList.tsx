interface AttackListProps {
  attacks: string[];
}

const FullCardAttacksList = ({ attacks }: AttackListProps) => (
  <ul className="full-card-attacks">
    {attacks.map((attack) => (
      <li key={attack}>{attack}</li>
    ))}
  </ul>
);

export default FullCardAttacksList;
