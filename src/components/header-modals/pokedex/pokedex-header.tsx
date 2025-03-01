import { Input } from "@/components/ui/primitives/input";
import { setFilteredPokemons, usePokedexStore } from "@/store/pokedex-store";
import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/primitives/button";
import { useFilterPokemons } from "@/hooks/use-filter-pokemons";
import TypeFilter from "@/components/ui/specific/type-filter";

const PokedexHeader = ({ onClose }: { onClose?: () => void }) => {
  const { pokemons } = usePokedexStore();
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { handleNameChange, filteredPokemons, filters, handleTypeSelect } =
    useFilterPokemons(pokemons);

  useEffect(() => {
    setFilteredPokemons(filteredPokemons);
  }, [filters]);

  const handleSearch = (pokemonName: string) => {
    setSearchTerm(pokemonName);
    handleNameChange(pokemonName);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <header className="pokedex-header h-16 items-center gap-2 bg-inventory-accent/80 p-3">
      <h2 className="text-lg font-medium text-amber-200">Pokédex</h2>

      <TypeFilter
        filtersType={filters.types}
        isTypeOpen={isTypeOpen}
        setIsTypeOpen={setIsTypeOpen}
        handleTypeSelect={handleTypeSelect}
        className="flex h-full w-full items-center justify-between bg-transparent text-amber-200 hover:bg-inventory-light/30"
        wrapperClassName=" w-40  h-full border bg-inventory-light/30 border-inventory-light place-self-end rounded-sm"
      />

      <div className="relative grid">
        <Input
          type="text"
          placeholder="Type name..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="border-inventory-light bg-inventory-light/30 py-1 pr-8 text-amber-200 placeholder-amber-100/50 focus-visible:bg-inventory-light/60"
        />

        {searchTerm ? (
          <Button
            type="button"
            variant="basic"
            size="icon"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-200/70 hover:text-amber-200"
          >
            <X size={16} />
          </Button>
        ) : (
          <Search className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-200/60" />
        )}
      </div>
    </header>
  );
};

export default PokedexHeader;
