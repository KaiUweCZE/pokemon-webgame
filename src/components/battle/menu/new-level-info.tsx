import Expander from "@/components/ui/primitives/expander";
import { pokemonsData } from "@/data/pokemons/pokemon-data";
import { setNewLevel } from "@/store/battle/actions/battle-state";
import { useBattleStore } from "@/store/battle/battle-store";
import { calculateNewStats, convertToPokemonCreate } from "@/utils/pokemon-stats";
import { capitalize } from "@/utils/string";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";

const NewLevelInfo = () => {
  const [isHover, setIsHover] = useState(false);
  const { newLevel, userPokemon } = useBattleStore();

  /* Need to be tested*/
  useEffect(() => {
    if (newLevel) {
      const timer = setTimeout(() => {
        if (!isHover) {
          setNewLevel(false);
        }
      }, 5000);
      return () => clearTimeout(timer);
    } else if (isHover) {
      setNewLevel(true);
    }
  }, [newLevel, isHover]);

  if (!userPokemon || !newLevel) return null;

  const baseData = pokemonsData.find((p) => p.name === userPokemon.name);
  const convertedBaseData = baseData && convertToPokemonCreate(baseData);
  const statChanges =
    convertedBaseData &&
    calculateNewStats(userPokemon.level - 1, userPokemon.level, convertedBaseData);

  if (!statChanges) return null;
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="absolute bottom-0 w-full text-battle-text"
    >
      <Expander isOpen={newLevel}>
        <div className="grid h-auto gap-4 rounded-t-sm border-2 border-b-0 border-battle-border/40 bg-battle/90 p-4 backdrop-blur-sm hover:bg-battle-secondary">
          {/* Level Up Announcement */}
          <X
            className="absolute right-0 top-0 h-4 w-4 cursor-pointer bg-battle-secondary"
            onClick={() => setNewLevel(false)}
          />
          <div>
            <h3 className="font-medium">
              {capitalize(userPokemon.name)} reached level {userPokemon.level}!
            </h3>
          </div>

          {/* Stats Improvements */}
          <div className="flex flex-col">
            <h4 className="font-medium">Stats Improved:</h4>
            <div className="grid gap-1 p-2">
              {statChanges.map((stat) => (
                <div key={stat.name} className="new-level-box">
                  <span>{stat.name.slice(0, 3)}.</span>
                  <div className="new-stats">
                    <div className="flex items-center gap-1">
                      <span className="text-sm">{stat.oldValue}</span>
                      <ArrowRight className="inline h-4 w-4 text-green-500" strokeWidth={3} />{" "}
                      <span className="text-sm">{stat.newValue}</span>
                    </div>
                    <span className="text-sm text-green-500">(+{stat.increase})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Expander>
    </div>
  );
};

export default NewLevelInfo;
