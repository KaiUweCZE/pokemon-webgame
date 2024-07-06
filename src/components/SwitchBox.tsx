"use client";
import { BattleContext } from "@/contexts/BattleContext";
import { UserContext } from "@/contexts/UserContext";
import { Pokemon } from "@/types/pokemon";
import { PokemonBattle } from "@/types/pokemonBattle";
import { getSix } from "@/utils/battle-function/getSix";
import { generatePokemonIcon } from "@/utils/generatePokemonImage";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import SwitchBoxItems from "./SwitchBoxItem";

interface SwitchBoxProps {
  setMenuChoice: Dispatch<SetStateAction<string>>;
}

const SwitchBox = ({ setMenuChoice }: SwitchBoxProps) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const context = useContext(UserContext);
  const battleContext = useContext(BattleContext);

  useEffect(() => {
    const getPokemons = async () => {
      if (context?.currentUser?.name) {
        const newPokemons = await getSix(context.currentUser?.name);
        setPokemons(newPokemons);
      }
    };

    getPokemons();
  }, []);

  return (
    <div className="switch-box">
      <ul>
        {pokemons.map((pokemon) => (
          <SwitchBoxItems key={pokemon.id} pokemon={pokemon} />
        ))}
      </ul>
      <button className="button-primary" onClick={() => setMenuChoice("")}>
        close
      </button>
    </div>
  );
};

export default SwitchBox;
