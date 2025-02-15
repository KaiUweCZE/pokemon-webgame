import { Button } from "@/components/ui/primitives/button";
import { useBattleStore } from "@/store/battle/battle-store";
import { capitalize } from "@/utils/string";

const CaughtPokemonWindow = () => {
  const { enemyPokemon } = useBattleStore();

  if (!enemyPokemon) return null;

  return (
    <div className="grid place-items-center">
      <div className="space-y-2">
        <article className="text-center">
          <h2>{`It works! You caught ${capitalize(enemyPokemon.name)}!`}</h2>
          <p>Do you want to continue?</p>
        </article>
        <div className="flex w-full gap-2">
          <Button size="full" variant="light" border={true} onClick={() => {}}>
            Yes
          </Button>

          <Button size="full" variant="light" border={true} onClick={() => {}}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaughtPokemonWindow;
