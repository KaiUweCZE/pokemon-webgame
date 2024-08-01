import Image, { StaticImageData } from "next/image";
import PokemonsBar from "./PokemonsBar";
import { useContext } from "react";
import { NpcBattleContext } from "./NpcBattleContext";
import { generatePokemonImage } from "@/utils/generatePokemonImage";
import OponentPokemonStats from "./OponentPokemonStats";

interface OponentImageProps {
  img: StaticImageData;
}

const OponentImage = ({ img }: OponentImageProps) => {
  const context = useContext(NpcBattleContext);

  const pokemonImg =
    context?.currentOponentPokemon &&
    generatePokemonImage(context.currentOponentPokemon.name);
  return (
    <div className="oponent">
      {context?.startBattle && context?.currentOponentPokemon ? (
        <OponentPokemonStats pokemon={context.currentOponentPokemon} />
      ) : (
        <PokemonsBar />
      )}
      {img && !context?.startBattle ? (
        <Image className="oponent-image" src={img} alt="oponent" height={170} />
      ) : (
        pokemonImg && (
          <Image
            className="oponent-pokemon"
            src={pokemonImg}
            alt="oponent pokemon"
            width={170}
          />
        )
      )}
    </div>
  );
};

export default OponentImage;
