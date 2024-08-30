import { useCallback, useContext } from "react";
import { NpcBattleContext } from "../../app/npc-battle/NpcBattleContext";
import { randomOponentPokemon } from "../../app/npc-battle/npc-utils/randomOponentPokemon";
import { BattleMenuState } from "@/types/enums/enumBattleMenu";
import { generateBattleText } from "../../utils/battle-function/generateBattleText";
import GenerateBattleButton from "./GenerateBattleButton";
import { BattleState } from "@/types/enums/battleState";
import { PokemonContext } from "@/contexts/PokemonContext";
import { useRouter } from "next/navigation";
import { switchingTimer } from "@/utils/timer/switchingTimer";

const BattleText = () => {
  const context = useContext(NpcBattleContext);
  const pokemonContext = useContext(PokemonContext);
  const router = useRouter();
  if (!context || !pokemonContext) {
    throw new Error("context is missing");
  }

  const {
    setStartBattle,
    setMenuOption,
    setCurrentOponentPokemon,
    currentOponentPokemon,
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

    //setMenuOption(BattleMenuState.FIGHT);
    // button actions in different casses of battle state
    switch (battleState) {
      case BattleState.NOT_STARTED:
        if (oponentPokemons?.length) {
          setStartBattle(true);
          //setMenuOption(BattleMenuState.FIGHT);
          const userPokemon = pokemonsFromSix.find(
            (pokemon) => pokemon.actualHp > 0
          );
          if (userPokemon) {
            setCurrentPokemon(userPokemon);
          }
          const number = randomOponentPokemon(oponentPokemons?.length);
          setCurrentOponentPokemon(oponentPokemons[number]);
          setBattleState(BattleState.BATTLE_START);
          switchingTimer(() => {
            setBattleState(BattleState.BATTLE);
          });
          console.log("Battle started, new state:", BattleState.BATTLE);
        } else {
          console.log("No opponent pokemons available");
        }
        break;
      case BattleState.USER_POKEMON_FAINTED:
        const nextPokemon = pokemonsFromSix.find(
          (pokemon) => pokemon.actualHp > 0
        );
        if (nextPokemon) {
          setCurrentPokemon(nextPokemon);
          setBattleState(BattleState.BATTLE);
          setStopBattle(false);
        } else {
          setBattleState(BattleState.OPPONENT_VICTORY);
        }
        break;
      case BattleState.BATTLE:
        context.setMenuOption(BattleMenuState.FIGHT);
        break;
      case BattleState.USER_VICTORY:
        router.push("/map");
        break;
      case BattleState.CANNOT_START:
      case BattleState.BATTLE_STOPPED:
        router.push("/map");
        break;
      default:
        console.log("Default action for state:", battleState);
    }
  };

  const battleText = generateBattleText(
    battleState,
    currentPokemon?.name,
    currentOponentPokemon?.name
  );

  return (
    <div className="battle-text">
      <p>{battleText}</p>
      <GenerateBattleButton state={battleState} onButtonClick={buttonUtils} />
    </div>
  );
};

export default BattleText;
