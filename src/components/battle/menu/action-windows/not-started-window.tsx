import { useBattleStore } from "@/store/battle-store";
import { capitalize } from "@/utils/string";

const NotStartedWindow = () => {
  const { enemyPokemon, enemyType } = useBattleStore();

  if (!enemyPokemon) return null;

  return (
    <p className="not-started text-amber-100">
      {enemyType === "wild"
        ? `Oh man! A wild ${capitalize(enemyPokemon.name)} appeared!`
        : `Trainer wants to battle with ${capitalize(enemyPokemon.name)}!`}
    </p>
  );
};

export default NotStartedWindow;
