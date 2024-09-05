import { Dispatch, SetStateAction, useState } from "react";
import PokedexList from "./PokedexList";
import { PokemonPokedex } from "@/types/pokemonPokedex";
import PokedexPokemonDetail from "./PokedexPokemonDetail";
import PokedexSearchBar from "./PokedexSearchBar";
import { MenuType } from "../SecondaryMenu";
import Image from "next/image";
import closeIcon from "@/assets/images/icons/close.svg";

interface PokedexProps {
  setActive: Dispatch<SetStateAction<MenuType | null>>;
}

const PokedexInMenu = ({ setActive }: PokedexProps) => {
  const [pokemonPokedex, setPokemonPokedex] = useState<PokemonPokedex | null>(
    null
  );

  const handleClose = () => {
    setActive(null);
  };

  return (
    <div className="pokedex-wrap">
      <div className="pokedex-menu">
        <Image
          className="close-icon"
          src={closeIcon}
          alt="close icon"
          width={20}
          height={20}
          onClick={handleClose}
        />
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

export default PokedexInMenu;
