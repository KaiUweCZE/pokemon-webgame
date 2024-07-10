"use client";
import HpBar from "@/components/HpBar";
import { PokemonContext } from "@/contexts/PokemonContext";
import { UserContext } from "@/contexts/UserContext";
import { PokemonBattle } from "@/types/pokemonBattle";
import { generatePokemon } from "@/utils/generatePokemon";
import { useContext, useState } from "react";
import Image from "next/image";
import { pokemonsData } from "@/data/pokemonData";
import { generatePokemonImage } from "@/utils/generatePokemonImage";
import EnemyPokemon from "@/components/battle-components/EnemyPokemon";
import { BattleContext } from "@/contexts/BattleContext";
import Battlefield from "@/components/battle-components/Battlefield";
import { generatePokemonsRate } from "@/utils/generatePokemonsRate";
import { addPokemon } from "./intro/scenes/action";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data } = useSession();
  const [checkPokemon, setCheckPokemon] = useState<PokemonBattle>();
  const context = useContext(UserContext);
  const pokemonContext = useContext(PokemonContext);
  const battleContext = useContext(BattleContext);
  if (!context || !battleContext) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  if (pokemonContext === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  const loger = () => {
    const generatedPokemon = generatePokemon(1);
    if (!generatePokemon) {
      throw new Error("useUserContext must be used within a UserProvider");
    }

    setCheckPokemon(generatedPokemon);
    battleContext.setEnemyPokemon(generatedPokemon);
    if (pokemonContext.pokemonsFromSix) {
      battleContext.setUserPokemon(pokemonContext.pokemonsFromSix[0]);
    }

    console.log("session data", data?.user);

    console.log("user first pokemon ", pokemonContext.userPokemons);
    console.log("enemy pokemon: ", battleContext.enemyPokemon);
    console.log("user pokemon: ", battleContext.userPokemon);
    console.log("USER SIX: ", pokemonContext.pokemonsFromSix);
  };

  const pokemonImage =
    checkPokemon?.name !== undefined &&
    generatePokemonImage(checkPokemon?.name);

  return (
    <main className="container-home">
      <button className="button-primary" onClick={loger}>
        click
      </button>
      {battleContext.userPokemon && battleContext.enemyPokemon && (
        <Battlefield />
      )}
    </main>
  );
};

export default Home;
