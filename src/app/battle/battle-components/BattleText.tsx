import GenerateBattleButton from "@/components/battle/GenerateBattleButton";
import { BattleContext } from "@/contexts/BattleContext";
import { BattleState } from "@/types/enums/battleState";
import { generateBattleText } from "@/utils/battle-function/generateBattleText";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { RoundContext } from "../RoundContext";
import { PokemonContext } from "@/contexts/PokemonContext";
import { Item } from "@/types/item";

interface TextProps {
  battleState: BattleState;
}

const BattleText = ({ battleState }: TextProps) => {
  const context = useContext(BattleContext);
  const roundContext = useContext(RoundContext);
  const pokemonContext = useContext(PokemonContext);
  const router = useRouter();
  const battleText = generateBattleText(
    battleState,
    "",
    context?.enemyPokemon?.name,
    pokemonContext?.exps,
    pokemonContext?.reward
  );

  const generateButtonFunc = () => {
    switch (context?.battleState) {
      case BattleState.USER_POKEMON_FAINTED:
        return console.log("battle state: ", context?.battleState, "oooo");
      case BattleState.WILD_POKEMON_FAINTED:
      case BattleState.CAUGHT:
        return roundContext?.setRound(() => roundContext.round + 1);
      case BattleState.WILD_POKEMON_APPEAR:
        return context.setBattleState(BattleState.BATTLE);
      case BattleState.LAST_ROUND_DONE:
        return router.push("/map");
    }
  };
  return (
    <div className="battle-text">
      <p>{battleText}</p>
      {context?.battleState === BattleState.WILD_POKEMON_FAINTED ||
      context?.battleState === BattleState.CAUGHT ? (
        <div className="box-buttons">
          <GenerateBattleButton
            state={context?.battleState ?? BattleState.BATTLE}
            onButtonClick={generateButtonFunc}
          />
          <button
            className="button-primary"
            onClick={() => {
              router.push("/map");
            }}
          >
            no
          </button>
        </div>
      ) : (
        <GenerateBattleButton
          state={context?.battleState ?? BattleState.BATTLE}
          onButtonClick={generateButtonFunc}
        />
      )}
    </div>
  );
};

export default BattleText;
