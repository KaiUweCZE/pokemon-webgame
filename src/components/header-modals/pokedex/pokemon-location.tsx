import { locationPokemons } from "@/data/locations/location-pokemon";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePokedexStore } from "@/store/pokedex-store";
import { LocationName } from "@/types/location";
import { cn } from "@/utils/cn";

const PokemonLocation = () => {
  const { data: user } = useCurrentUser();
  const { currentPokemon } = usePokedexStore();

  // filter locations where the pokemon is available
  const locations = Object.keys(locationPokemons).filter((location) =>
    locationPokemons[location as LocationName].some((pokemon) => pokemon === currentPokemon.name)
  );

  // get locations where the user has visited
  const userLocation = user?.visitedLocations.filter((location) => locations.includes(location));

  const lastLocation = (index: number) => {
    if (!userLocation) return "";
    return userLocation?.length - 1 === index ? "" : ",";
  };

  return (
    <ul className="pokedex-pokemon-location inventory-scrollbar flex gap-1 rounded-sm bg-inventory-light/20 px-2 py-1 text-amber-100">
      <li className="text-amber-200">Habitat:</li>
      {userLocation && userLocation.length > 0 ? (
        userLocation.map((location, index) => (
          <li
            key={location}
            className={cn(
              "capitalize",
              location === user?.location && "font-medium text-amber-200"
            )}
          >
            {location}
            {lastLocation(index)}
          </li>
        ))
      ) : (
        <li>Unknown locations</li>
      )}
    </ul>
  );
};

export default PokemonLocation;
