import Image, { StaticImageData } from "next/image";
import PokemonsBar from "./PokemonsBar";
import { useContext } from "react";
import { PokemonContext } from "@/contexts/PokemonContext";
import { NpcBattleContext } from "./NpcBattleContext";
import useLoadSixToContext from "./useLoadSixToContext";
import { generatePokemonImageBack } from "@/utils/generatePokemonImage";
import HpBar from "@/components/HpBar";
import UserPokemonStats from "./UserPokemonStats";

interface UserImageProps {
  img: StaticImageData;
}

const UserImage = ({ img }: UserImageProps) => {
  const contextPokemon = useContext(PokemonContext);
  const context = useContext(NpcBattleContext);

  if (!contextPokemon) return null;

  const pokemon = contextPokemon.currentPokemon;
  const pokemonImg = pokemon ? generatePokemonImageBack(pokemon.name) : null;

  useLoadSixToContext();

  return (
    <div className="user-pokemon">
      {context?.startBattle && pokemon ? (
        <UserPokemonStats pokemon={pokemon} />
      ) : (
        <PokemonsBar />
      )}
      {!context?.startBattle ? (
        <Image className="user-image" src={img} alt="back" height={170} />
      ) : (
        <>
          {pokemonImg && (
            <Image
              className="user-image"
              src={pokemonImg}
              alt="back"
              height={170}
            />
          )}
        </>
      )}
    </div>
  );
};

export default UserImage;
