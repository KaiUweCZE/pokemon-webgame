import Image, { StaticImageData } from "next/image";
import PokemonsBar from "./PokemonsBar";
import { useContext } from "react";
import { NpcBattleContext } from "./NpcBattleContext";
import { generatePokemonImage } from "@/utils/generatePokemonImage";
import OponentPokemonStats from "./OponentPokemonStats";
import field from "@/assets/images/fields/field2.webp";
//import go from "@/assets/images/gif/goout.gif";
import go from "@/assets/images/gif/go-500ms-delay.gif";
import { BattleState } from "@/types/enums/battleState";
import { getCssClass } from "./npc-utils/getCssClass";

interface OponentImageProps {
  img: StaticImageData;
}

const OponentImage = ({ img }: OponentImageProps) => {
  const context = useContext(NpcBattleContext);

  const pokemonImg =
    context?.currentOponentPokemon &&
    generatePokemonImage(context.currentOponentPokemon.name);
  return (
    <div
      className={
        context?.battleState
          ? getCssClass("oponent", context?.battleState)
          : "oponent"
      }
    >
      {(context?.battleState === BattleState.BATTLE_START ||
        context?.battleState === BattleState.OPPONENT_SWITCHING_POKEMON) && (
        <Image
          className="go-in-pokemon"
          src={go}
          alt="throwing pokeball"
          height={150}
        />
      )}
      <Image className="field" src={field} alt="battle field" width={280} />
      {context?.startBattle &&
      context?.currentOponentPokemon &&
      context.battleState !== BattleState.USER_VICTORY ? (
        <OponentPokemonStats pokemon={context.currentOponentPokemon} />
      ) : (
        <>
          {context?.oponentPokemons && (
            <PokemonsBar pokemons={context?.oponentPokemons} />
          )}
        </>
      )}
      {(img && !context?.startBattle) ||
      context?.battleState === BattleState.USER_VICTORY ? (
        <Image
          className="oponent-image"
          src={img}
          alt="oponent"
          width={90}
          height={180}
        />
      ) : (
        pokemonImg && (
          <>
            {context.attackAnimation && context.attack && (
              <Image
                className="attack-animation"
                src={context.attack?.img}
                alt="attack animation"
              />
            )}
            <Image
              className="oponent-pokemon"
              src={pokemonImg}
              alt="oponent pokemon"
              width={150}
            />
          </>
        )
      )}
    </div>
  );
};

export default OponentImage;
