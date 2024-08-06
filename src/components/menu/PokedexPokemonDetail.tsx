import { PokemonPokedex } from "@/types/pokemonPokedex";
import { findLocationOfPokemon } from "@/utils/pokedex-functions/findLocationOfPokemon";
import Image from "next/image";
import PokedexBaseInfo from "./PokedexBaseInfo";
import PokedexEvolutionChain from "./PokedexEvolutionChain";

interface PokedexDeatailProps {
  pokemonPokedex: PokemonPokedex | null;
}

const PokedexPokemonDetail = ({ pokemonPokedex }: PokedexDeatailProps) => {
  const locations = findLocationOfPokemon(pokemonPokedex?.id ?? 0);

  return (
    <div className="pokedex-pokemon-wrapper">
      <div className="pokedex-pokemon">
        {pokemonPokedex?.img && (
          <Image
            src={pokemonPokedex.img}
            alt="image of pokemon"
            width={150}
            height={150}
          />
        )}
        <PokedexBaseInfo pokemonPokedex={pokemonPokedex} />
        <ul className="pokedex-location">
          {locations?.length > 0 ? (
            <>
              <li>locations: </li>
              {locations.map((location) => (
                <li key={location.id}>{location.name}</li>
              ))}
            </>
          ) : (
            <li>no area</li>
          )}
        </ul>
      </div>
      <PokedexEvolutionChain pokemon={pokemonPokedex} />
    </div>
  );
};

export default PokedexPokemonDetail;
