import { Button } from "@/components/ui/primitives/button";
import { useBattleStore } from "@/store/battle/battle-store";
import { capitalize } from "@/utils/string";

const UserPokemonWinWindow = () => {
  const { enemyPokemon, userPokemon, gainedExp } = useBattleStore();

  if (!userPokemon || !enemyPokemon) return null;
  return (
    <div className="grid place-items-center">
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col items-center">
          <p>{`${capitalize(enemyPokemon.name)} is not possible to fight.`}</p>
          <p>{`${capitalize(userPokemon.name)} gained ${gainedExp} exp.`}</p>
        </div>
        <div className="flex gap-2">
          <Button size="full" variant="light" border={true} className="px-4 py-1">
            Continue
          </Button>
          <Button size="full" variant="light" border={true} className="px-4 py-1">
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserPokemonWinWindow;
