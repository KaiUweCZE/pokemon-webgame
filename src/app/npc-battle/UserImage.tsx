import Image, { StaticImageData } from "next/image";
import PokemonsBar from "./PokemonsBar";
import { useContext } from "react";
import { PokemonContext } from "@/contexts/PokemonContext";
import { NpcBattleContext } from "./NpcBattleContext";
import { generatePokemonImageBack } from "@/utils/generatePokemonImage";
import UserPokemonStats from "./UserPokemonStats";
import { useCssClass } from "./hooks/useCssClass";
import { NpcBattleState } from "@/types/enums/npcBattleState";
import goOut2 from "@/assets/images/gif/puff.gif";
import goOut from "@/assets/images/gif/goout.gif";

interface UserImageProps {
  img: StaticImageData;
}

const UserImage = ({ img }: UserImageProps) => {
  const pokemonContext = useContext(PokemonContext);
  const context = useContext(NpcBattleContext);
  const generateCss = useCssClass();

  if (!pokemonContext) return null;

  const pokemon = pokemonContext.currentPokemon;
  const pokemons = pokemonContext.pokemonsFromSix;
  const pokemonImg = pokemon ? generatePokemonImageBack(pokemon.name) : null;

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
              {(context.battleState ===
                NpcBattleState.PLAYER_SWITCHING_POKEMON ||
                context.battleState === NpcBattleState.BATTLE_START) && (
                <Image
                  className="user-pokemon-go-out"
                  src={goOut}
                  alt="user pokemon come out"
                  height={220}
                />
              )}
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
