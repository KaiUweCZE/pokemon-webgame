interface TextProps {
  pokemonName: string;
}

const BattleText = ({ pokemonName }: TextProps) => {
  return (
    <div className="battle-text">
      <p>{`oh man, that looks like a ${pokemonName}!`}</p>
    </div>
  );
};

export default BattleText;
