interface EvolutionsProps {
  pokemonName: string;
}

const IntroEvolutionsList = ({ pokemonName }: EvolutionsProps) => {
  return (
    <section className="intro-evolutions">
      <ul className="evolutions-list">
        <li>
          <span>Evolutions: </span>
        </li>
        {pokemonName === "Eevee" && (
          <li className="evolutions-list-item">umbreon/espeon</li>
        )}
        {pokemonName === "Teddiursa" && (
          <li className="evolutions-list-item">ursaring,ursaluna</li>
        )}
      </ul>
    </section>
  );
};

export default IntroEvolutionsList;
