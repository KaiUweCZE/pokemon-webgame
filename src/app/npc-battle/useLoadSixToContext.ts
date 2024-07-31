import { PokemonContext } from "@/contexts/PokemonContext";
import { useContext, useEffect } from "react";
import { getSix } from "@/utils/battle-function/getSix";
import { useSession } from "next-auth/react";

const useLoadSixToContext = () => {
  const { data } = useSession();
  const context = useContext(PokemonContext);

  useEffect(() => {
    console.log("useEffect was activated", context?.pokemonsFromSix);
    if (!data || !context) return;
    if (context.pokemonsFromSix.length === 0) {
      console.log("start with fetching");

      const fetchSix = async () => {
        try {
          const pokemonSix = await getSix(data.user.name);
          if (pokemonSix) {
            context?.setPokemonsFromSix(pokemonSix);
            context.setCurrentPokemon(pokemonSix[0]);
            console.log("set the pokemns: ", pokemonSix);
          } else {
            console.log("pokemon is not set");
          }
        } catch (error) {
          console.error("error occurs: ", error);
        }
      };

      fetchSix();
    }
  }, [data]);
};

export default useLoadSixToContext;
