import { Search, Filter } from "lucide-react";
import { useState } from "react";

const POKEMON_TYPES = [
  "NORMAL",
  "FIRE",
  "WATER",
  "ELECTRIC",
  "GRASS",
  "ICE",
  "FIGHTING",
  "POISON",
  "GROUND",
  "FLYING",
  "PSYCHIC",
  "BUG",
  "ROCK",
  "GHOST",
  "DRAGON",
  "DARK",
  "STEEL",
  "FAIRY",
];

interface ProfilePokemonSearchProps {
  onSearch: (query: { type?: string; level?: number }) => void;
}

export const ProfilePokemonSearch = ({ onSearch }: ProfilePokemonSearchProps) => {
  const [searchParams, setSearchParams] = useState({ type: "", level: "" });

  const handleSearch = (key: string, value: string) => {
    const newParams = { ...searchParams, [key]: value };
    setSearchParams(newParams);
    onSearch({
      type: newParams.type || undefined,
      level: newParams.level ? parseInt(newParams.level) : undefined,
    });
  };

  return (
    <div className="flex h-16 items-center gap-4 rounded-xl bg-slate-700/20 px-4">
      {/* Ikona a nadpis */}
      <div className="flex items-center gap-2 text-slate-400">
        <Search className="h-4 w-4" />
        <span className="hidden text-sm sm:inline">Find Pokemon</span>
      </div>

      {/* Filtry */}
      <div className="flex flex-1 items-center gap-4">
        {/* Select pro typ */}
        <div className="relative flex-1">
          <select
            value={searchParams.type}
            onChange={(e) => handleSearch("type", e.target.value)}
            className="h-10 w-full rounded-lg bg-slate-800/90 pl-3 pr-8 text-sm text-slate-200 outline-none ring-1 ring-slate-700/50 focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="">All Types</option>
            {POKEMON_TYPES.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0) + type.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Input pro level */}
        <div className="relative flex-1">
          <input
            type="number"
            min="1"
            max="100"
            value={searchParams.level}
            onChange={(e) => handleSearch("level", e.target.value)}
            placeholder="Enter level..."
            className="h-10 w-full rounded-lg bg-slate-800/90 px-3 text-sm text-slate-200 outline-none ring-1 ring-slate-700/50 placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      </div>

      {/* Filter ikona */}
      <Filter className="h-4 w-4 text-slate-400" />
    </div>
  );
};

export default ProfilePokemonSearch;
