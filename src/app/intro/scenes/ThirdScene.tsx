import teddiursaImg from "@/assets/images/pokemons/teddiursa.webp";
import eeveeImg from "@/assets/images/pokemons/eevee.webp";
import PokemonItem from "./intro-components/PokemonItem";

const ThirdScene = () => {
  const teddyText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
              minus eum quo voluptatem illo odit, deleniti exercitationem neque
              eius nam nisi officiis ducimus quaerat.`;
  const eeveeText = ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fugiat!
`;

  return (
    <section className="third-scene">
      <PokemonItem
        pokemonName="Teddiursa"
        pokemonDataId={216}
        pokemonInfo={teddyText}
        img={teddiursaImg}
      />
      <PokemonItem
        pokemonName="Eevee"
        pokemonDataId={133}
        pokemonInfo={eeveeText}
        img={eeveeImg}
      />
    </section>
  );
};

export default ThirdScene;
