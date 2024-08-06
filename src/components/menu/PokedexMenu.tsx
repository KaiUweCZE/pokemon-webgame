import { useState } from "react";
import PokedexList from "./PokedexList";
import { PokemonPokedex } from "@/types/pokemonPokedex";
import PokedexPokemonDetail from "./PokedexPokemonDetail";

const PokedexMenu = () => {
  const [pokemonPokedex, setPokemonPokedex] = useState<PokemonPokedex | null>(
    null
  );

  return (
    <div className="pokedex-wrap">
      <h2>Pokedex</h2>
      <section className="pokedex">
        {pokemonPokedex && (
          <PokedexPokemonDetail pokemonPokedex={pokemonPokedex} />
        )}
        <PokedexList setPokemonPokedex={setPokemonPokedex} />
      </section>
    </div>
  );
};

export default PokedexMenu;
