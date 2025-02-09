import BattleContainer from "@/components/battle/container/battle-container";
import BattleMenu from "@/components/battle/menu/battle-menu";
import { pokemonsImg } from "@/images";
import "@/styles/battle-styles.css";
import { PokemonName } from "@/types/pokemon";
import Image from "next/image";

const BattlePage = () => {
  const enemyImage = pokemonsImg["pikachu"].default;
  const userPokemonImg = pokemonsImg["charizard"].back;

  const enemy = {
    name: "pikachu" as PokemonName,
    image: enemyImage,
    level: 10,
    maxHp: 100,
    currentHp: 40,
  };

  const userPokemon = {
    pokemonName: "charizard" as PokemonName,
    image: userPokemonImg,
    level: 10,
    maxHp: 100,
    currentHp: 40,
    maxEnergy: 100,
    currentEnergy: 40,
    expToNextLevel: 100,
    currentExp: 40,
  };
  return (
    <div className="absolute inset-0 z-0 grid h-screen">
      <div className="large-width mx-auto grid">
        <main className="battle-window mx-auto mt-36 rounded-sm border shadow-primary">
          <BattleContainer enemy={enemy} userPokemon={userPokemon} />
          <BattleMenu />
        </main>
      </div>
    </div>
  );
};

export default BattlePage;
