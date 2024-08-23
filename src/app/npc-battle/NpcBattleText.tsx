import { useCallback, useContext } from "react";
import { NpcBattleContext } from "./NpcBattleContext";
import { randomOponentPokemon } from "./npc-utils/randomOponentPokemon";
import { BattleMenu } from "@/types/enums/enumBattleMenu";
import { generateBattleText } from "./npc-utils/generateBattleText";
import GenerateBattleButton from "./npc-utils/GenerateBattleButton";
import { NpcBattleState } from "@/types/enums/npcBattleState";
import { PokemonContext } from "@/contexts/PokemonContext";
import { useRouter } from "next/navigation";
import { switchingTimer } from "@/utils/timer/switchingTimer";

const NpcBattleText = () => {
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

    //setMenuOption(BattleMenu.FIGHT);
    // button actions in different casses of battle state
    switch (battleState) {
      case NpcBattleState.NOT_STARTED:
        if (oponentPokemons?.length) {
          setStartBattle(true);
          //setMenuOption(BattleMenu.FIGHT);
          const userPokemon = pokemonsFromSix.find(
            (pokemon) => pokemon.actualHp > 0
          );
          if (userPokemon) {
            setCurrentPokemon(userPokemon);
          }
          const number = randomOponentPokemon(oponentPokemons?.length);
          setCurrentOponentPokemon(oponentPokemons[number]);
          setBattleState(NpcBattleState.BATTLE_START);
          switchingTimer(() => {
            setBattleState(NpcBattleState.BATTLE);
          });
          console.log("Battle started, new state:", NpcBattleState.BATTLE);
        } else {
          console.log("No opponent pokemons available");
        }
        break;
      case NpcBattleState.USER_POKEMON_FAINTED:
        const nextPokemon = pokemonsFromSix.find(
          (pokemon) => pokemon.actualHp > 0
        );
        if (nextPokemon) {
          setCurrentPokemon(nextPokemon);
          setBattleState(NpcBattleState.BATTLE);
          setStopBattle(false);
        } else {
          setBattleState(NpcBattleState.OPPONENT_VICTORY);
        }
        break;
      case NpcBattleState.BATTLE:
        context.setMenuOption(BattleMenu.FIGHT);
        break;
      case NpcBattleState.CANNOT_START:
      case NpcBattleState.BATTLE_STOPPED:
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

export default NpcBattleText;
