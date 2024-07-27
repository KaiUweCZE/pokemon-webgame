import { Dispatch, SetStateAction } from "react";
import teddiursaImg from "@/assets/images/pokemons/teddiursa.webp";
import eeveeImg from "@/assets/images/pokemons/eevee.webp";
import PokemonItem from "./PokemonItem";

interface ThirdSceneProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const ThirdScene = (props: ThirdSceneProps) => {
  const teddyText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
              minus eum quo voluptatem illo odit, deleniti exercitationem neque
              eius nam nisi officiis ducimus quaerat.`;
  const eeveeText = ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fugiat!
`;

  return (
    <section className="third-scene">
      <PokemonItem
        pokemonName="Teddiursa"
        pokemonDataId={18}
        pokemonInfo={teddyText}
        img={teddiursaImg}
      />
      <PokemonItem
        pokemonName="Eevee"
        pokemonDataId={5}
        pokemonInfo={eeveeText}
        img={eeveeImg}
      />
      {/*
        <button
          className="button-primary"
          onClick={() => props.setStep(props.step - 1)}
        >
          prev
        </button>
      */}
    </section>
  );
};

export default ThirdScene;
