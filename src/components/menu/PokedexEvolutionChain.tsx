import { pokemonBattleData } from "@/data/pokemonBattleData";
import rightArrow from "@/assets/images/icons/right.png";
import Image from "next/image";
import { PokemonPokedex } from "@/types/pokemonPokedex";

interface PokedexEvolutionProps {
  pokemon: PokemonPokedex | null;
}

const PokedexEvolutionChain = ({ pokemon }: PokedexEvolutionProps) => {
  const generateEvolutionImg = (evolution: string) =>
    pokemonBattleData.find((pokemon) => pokemon.name === evolution)?.img ?? "";

  return (
    <ul className="evolution-chain">
      {pokemon?.evolutionChain &&
        pokemon?.evolutionChain.map((evolution: string, index: number) => (
          <li key={evolution + index} className="evolution-chain-item">
            <Image
              src={generateEvolutionImg(evolution)}
              alt="pokemon img"
              width={64}
            />
            {pokemon?.evolutionChain?.length &&
              index + 1 <= pokemon.evolutionChain.length - 1 && (
                <div className="arrow">
                  {pokemon.evolutionLevels &&
                    pokemon.evolutionLevels[index] !== undefined && (
                      <span
                        className="level"
                        key={pokemon.evolutionLevels[index]}
                      >
                        {pokemon.evolutionLevels[index]}.lvl
                      </span>
                    )}

                  <Image src={rightArrow} alt="right arrow" width={50} />
                </div>
              )}
          </li>
        ))}
    </ul>
  );
};

export default PokedexEvolutionChain;
