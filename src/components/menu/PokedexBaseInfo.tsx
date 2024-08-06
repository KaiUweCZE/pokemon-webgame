import { PokemonPokedex } from "@/types/pokemonPokedex";

interface BaseInfoProps {
  pokemonPokedex: PokemonPokedex | null;
}

const PokedexBaseInfo = ({ pokemonPokedex }: BaseInfoProps) => {
  return (
    <div className="pokedex-pokemon-info">
      <ul className="pokedex-base-info">
        <li>{pokemonPokedex?.name}</li>
        <ul className="base-info-types">
          {pokemonPokedex?.type.map((type) => (
            <li key={type} className={type}>
              {type}
            </li>
          ))}
        </ul>
        <li>hp: {pokemonPokedex?.hp}</li>
        <li>energy: {pokemonPokedex?.energy}</li>
        <li>speed: {pokemonPokedex?.speed}</li>
        <li>damage: {pokemonPokedex?.damage}</li>
        <li>defense: {pokemonPokedex?.defense}</li>
      </ul>
    </div>
  );
};

export default PokedexBaseInfo;
