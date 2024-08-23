import Image, { StaticImageData } from "next/image";
import PokemonsBar from "./PokemonsBar";
import { useContext, useState } from "react";
import { PokemonContext } from "@/contexts/PokemonContext";
import { NpcBattleContext } from "./NpcBattleContext";
import { generatePokemonImageBack } from "@/utils/generatePokemonImage";
import UserPokemonStats from "./UserPokemonStats";
import { useCssClass } from "./hooks/useCssClass";
import { NpcBattleState } from "@/types/enums/npcBattleState";
import goOut from "@/assets/images/gif/puff.gif";
import goIn from "@/assets/images/gif/goout.gif";
import SwitchPokemonImage from "./PokemonImages/SwitchPokemonImage";
import BattleStartImage from "./PokemonImages/BattleStartImage";

interface UserImageProps {
  img: StaticImageData;
}

const UserImage = ({ img }: UserImageProps) => {
  const pokemonContext = useContext(PokemonContext);
  const context = useContext(NpcBattleContext);
  const generateCss = useCssClass();

  const [displayedPokemon, setDisplayedPokemon] =
    useState<StaticImageData | null>(null);

  if (!pokemonContext) return null;

  const pokemon = pokemonContext.currentPokemon;
  const pokemons = pokemonContext.pokemonsFromSix;
  const pokemonImg = pokemon ? generatePokemonImageBack(pokemon.name) : null;

  const getImages = () => {
    switch (context?.battleState) {
      case NpcBattleState.BATTLE_START:
        return <BattleStartImage />;
      case NpcBattleState.USER_SWITCHING_POKEMON:
        return <SwitchPokemonImage />;
      default:
        break;
    }
  };
  return (
    <div className={generateCss("user-pokemon")}>
      {context?.startBattle && pokemon ? (
        <UserPokemonStats pokemon={pokemon} />
      ) : (
        <>{pokemons && <PokemonsBar pokemons={pokemons} />}</>
      )}
      {!context?.startBattle ? (
        <Image className="user-image" src={img} alt="back" height={170} />
      ) : (
        <>
          {context.oponentAttackAnimation && context.oponentAttack && (
            <Image
              className="opponent-attack"
              src={context.oponentAttack.img}
              alt="opponent attack animation"
              height={150}
            />
          )}
          {pokemonImg && (
            <>
              {getImages()}
              <Image
                className="user-pokemon-image"
                src={pokemonImg}
                alt="back"
                height={170}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserImage;

/*(context.battleState === NpcBattleState.USER_SWITCHING_POKEMON ||
                context.battleState === NpcBattleState.BATTLE_START) && (
                <Image
                  className="user-pokemon-go-in"
                  src={goIn}
                  alt="user pokemon coming in"
                  height={220}
                />
              )}
              {context.battleState ===
                NpcBattleState.USER_SWITCHING_POKEMON && (
                <Image
                  src={goOut}
                  className="user-pokemon-go-out"
                  alt="user pokemon go out"
                  height={150}
                />
              )*/
