import { PokemonContext } from "@/contexts/PokemonContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { getSix } from "@/utils/battle-function/getSix";
import { useSession } from "next-auth/react";
import { NpcBattleContext } from "../NpcBattleContext";
import { NpcBattleState } from "@/types/enums/npcBattleState";

const useLoadSixToContext = () => {
  const { data } = useSession();
  const npcBattleContext = useContext(NpcBattleContext);
  const context = useContext(PokemonContext);
  const [loading, setLoading] = useState(false);

  const fetchAndSetPokemon = useCallback(
    async (username: string) => {
      setLoading(true);
      try {
        const pokemonSix = await getSix(username);
        if (!pokemonSix || pokemonSix.length === 0) {
          console.log("Pokemons are not set");
          return;
        }
        context?.setPokemonsFromSix(pokemonSix);
        const readyPokemon = pokemonSix.find((pokemon) => pokemon.actualHp > 0);
        if (readyPokemon) {
          context?.setCurrentPokemon(readyPokemon);
          npcBattleContext?.setBattleState(NpcBattleState.NOT_STARTED);
        } else {
          console.log("pokemons are not ready");
          npcBattleContext?.setBattleState(NpcBattleState.CANNOT_START);
        }
      } catch (error) {
        console.error("error occurs: ", error);
        // there will be enum for error
      } finally {
        console.log("load end");
        setLoading(false);
      }
    },
    [context, npcBattleContext]
  );

  useEffect(() => {
    // check if ther is data, context and if pokemons from six are already fetched
    if (!data || !context || context.pokemonsFromSix.length > 0) return;
    const username = data.user.name;
    console.log("start with fetching");
    fetchAndSetPokemon(username);
  }, [data]);

  return { loading };
};

export default useLoadSixToContext;
