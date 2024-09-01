interface IntroPokemonBox {
  pokemonName: string;
  pokemonTypes: string[];
}

const IntroPokemonBox = ({ pokemonName, pokemonTypes }: IntroPokemonBox) => {
  return (
    <div className="intro-pokemon-box">
      <h3>{pokemonName}</h3>
      {pokemonTypes.map((type, index) => (
        <div key={index} className={`type-box ${type}`}>
          {type}
        </div>
      ))}
    </div>
  );
};

export default IntroPokemonBox;
