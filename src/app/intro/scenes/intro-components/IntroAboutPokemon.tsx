interface IntroAboutProps {
  pokemonName: string;
  pokemonInfo: string;
}

const IntroAboutPokemon = ({ pokemonName, pokemonInfo }: IntroAboutProps) => {
  return (
    <section className="about-pokemon">
      <h4>About {pokemonName}:</h4>
      <p>{pokemonInfo}</p>
    </section>
  );
};

export default IntroAboutPokemon;
