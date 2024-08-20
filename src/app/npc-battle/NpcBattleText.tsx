import { useCallback, useContext } from "react";
import { NpcBattleContext } from "./NpcBattleContext";
import { randomOponentPokemon } from "./npc-utils/randomOponentPokemon";
import { BattleMenu } from "@/types/enums/enumBattleMenu";
import { generateBattleText } from "./npc-utils/generateBattleText";
import GenerateBattleButton from "./npc-utils/GenerateBattleButton";
import { NpcBattleState } from "@/types/enums/npcBattleState";
import { PokemonContext } from "@/contexts/PokemonContext";

const NpcBattleText = () => {
  const context = useContext(NpcBattleContext);
  const pokemonContext = useContext(PokemonContext);
  if (!context || !pokemonContext) {
    throw new Error("context is missing");
  }

  const {
    setStartBattle,
    setMenuOption,
    setCurrentOponentPokemon,
    oponentPokemons,
    battleState,
    setBattleState,
    setStopBattle,
  } = context;

  const { setCurrentPokemon, currentPokemon, pokemonsFromSix } = pokemonContext;

  const buttonUtils = () => {
    console.log(
      "Creating button utils function for battle state:",
      battleState
    );

    switch (battleState) {
      case NpcBattleState.NOT_STARTED:
        if (oponentPokemons?.length) {
          setStartBattle(true);
          setMenuOption(BattleMenu.FIGHT);
          const number = randomOponentPokemon(oponentPokemons?.length);
          setCurrentOponentPokemon(oponentPokemons[number]);
          setBattleState(NpcBattleState.BATTLE);
          console.log("Battle started, new state:", NpcBattleState.BATTLE);
        } else {
          console.log("No opponent pokemons available");
        }
        break;
      case NpcBattleState.PLAYER_POKEMON_FAINTED:
        const nextPokemon = pokemonsFromSix.find(
          (pokemon) => pokemon.actualHp > 0
        );
        if (nextPokemon) {
          setCurrentPokemon(nextPokemon);
          setBattleState(NpcBattleState.BATTLE);
          setStopBattle(false);
        }

      default:
        console.log("Default action for state:", battleState);
    }
  };

  const battleText = generateBattleText(battleState);

  return (
    <div className="battle-text">
      <p>{battleText}</p>
      <GenerateBattleButton state={battleState} onButtonClick={buttonUtils} />
    </div>
  );
};

export default NpcBattleText;
