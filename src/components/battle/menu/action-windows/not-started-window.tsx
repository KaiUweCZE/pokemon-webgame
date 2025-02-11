import { useBattleStore } from "@/store/battle/battle-store";
import { capitalize } from "@/utils/string";

const NotStartedWindow = () => {
  const { enemyPokemon, enemyType } = useBattleStore();

  if (!enemyPokemon) return null;

  return (
    <div className="w-ful relative grid h-full place-items-center">
      <p className="text-lg text-slate-800">
        {enemyType === "wild"
          ? `Oh man! A wild ${capitalize(enemyPokemon.name)} appeared!`
          : `Trainer wants to battle with ${capitalize(enemyPokemon.name)}!`}
      </p>
    </div>
  );
};

export default NotStartedWindow;
