import { PokemonName } from "@/types/pokemon";
import { Bar } from "../ui/primitives/bar";
import { capitalize } from "@/utils/string";
import { cn } from "@/utils/cn";

interface UserPokemon {
  maxEnergy: number;
  currentEnergy: number;
  expToNextLevel: number;
  currentExp: number;
}

interface BattlePokemonStatsProps {
  pokemonName: PokemonName;
  pokemonLevel: number;
  maxHp: number;
  currentHp: number;
  userStats?: UserPokemon;
}

const BattlePokemonStats = ({
  pokemonName,
  pokemonLevel,
  maxHp,
  currentHp,
  userStats,
}: BattlePokemonStatsProps) => {
  return (
    <div
      className={cn(
        "battle-pokemon-stats border-2 border-slate-800 bg-amber-100 px-3 py-2 pb-1 shadow-secondary",
        userStats && "border-b-1 pb-2"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-800">{capitalize(pokemonName)}</span>
        <span className="text-sm font-medium text-slate-800">lv. {pokemonLevel}</span>
      </div>
      <div className="grid h-fit">
        <div className="bar-box gap-0.5">
          <span className="text-xxs font-medium text-slate-700">Hp</span>
          <Bar
            height="xs"
            variant="hp"
            actualValue={currentHp}
            maxValue={maxHp}
            lowThreshold={50}
          />
        </div>
        {userStats && (
          <div className="bar-box gap-0.5">
            <span className="text-xxs font-medium text-slate-700">En</span>
            <Bar
              height="xs"
              variant="energy"
              actualValue={userStats.currentEnergy}
              maxValue={userStats.maxEnergy}
              lowThreshold={25}
            />
          </div>
        )}
      </div>
      {userStats && (
        <div className="exp-bar absolute bottom-0 mx-auto translate-y-0.5 place-self-center">
          <Bar
            className="h-2"
            height="xxs"
            variant="exp"
            actualValue={userStats.currentExp}
            maxValue={userStats.expToNextLevel}
          />
        </div>
      )}
    </div>
  );
};

export default BattlePokemonStats;
