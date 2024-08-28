import { useState } from "react";
import PokedexList from "./PokedexList";
import { PokemonPokedex } from "@/types/pokemonPokedex";
import PokedexPokemonDetail from "./PokedexPokemonDetail";
import PokedexSearchBar from "./PokedexSearchBar";

const PokedexMenu = () => {
  const [pokemonPokedex, setPokemonPokedex] = useState<PokemonPokedex | null>(
    null
  );

  return (
    <div className="pokedex-wrap">
      <div className="pokedex-menu">
        <PokedexSearchBar />
        <h2>Pokedex</h2>
      </div>
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
