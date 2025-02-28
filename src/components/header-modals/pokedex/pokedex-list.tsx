import { cn } from "@/utils/cn";
import { PokedexPokemon, setCurrentPokemon, usePokedexStore } from "@/store/pokedex-store";

const PokedexList = () => {
  const { pokemons, filteredPokemons, currentPokemon } = usePokedexStore();

  const handlePokemonClick = (pokemon: PokedexPokemon) => {
    console.log(pokemon);
    setCurrentPokemon(pokemon);
  };

  return (
    <div className="pokedex-list inventory-scrollbar h-full w-32 text-amber-100">
      <div className="grid bg-inventory-accent/60 py-2">
        <ul className="h-fit">
          {filteredPokemons.map((pokemon) => (
            <li
              className={cn(
                "h-fit cursor-pointer px-4 py-1 hover:bg-inventory-light/20 hover:text-amber-200",
                currentPokemon?.id === pokemon.id && "bg-inventory-light/20 text-amber-200"
              )}
              key={pokemon.id}
              onClick={() => handlePokemonClick(pokemon)}
              role="button"
            >
              <span>{pokemon.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokedexList;
