import { PokemonContext, PokemonWithOrder } from "@/contexts/PokemonContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { getSix } from "@/utils/battle-function/getSix";
import { useSession } from "next-auth/react";
import { NpcBattleContext } from "../app/npc-battle/NpcBattleContext";
import { BattleState } from "@/types/enums/battleState";
import { Pokemon } from "@/types/pokemon";

const useLoadSixToContext = () => {
  const { data } = useSession();
  const npcBattleContext = useContext(NpcBattleContext);
  const context = useContext(PokemonContext);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchAndSetPokemon = useCallback(
    async (username: string) => {
      console.log("this not");
      setLoading(true);
      try {
        const pokemonSix = await getSix(username);
        if (!pokemonSix || pokemonSix.length === 0) {
          console.log("Pokemons are not set");
          return;
        }

        const typedPokemonSix: PokemonWithOrder[] = pokemonSix.map(
          (pokemon): PokemonWithOrder => ({
            ...(pokemon as Pokemon),
            order: pokemon.order ?? 0,
          })
        );

        context?.setPokemonsFromSix(
          typedPokemonSix.sort((a, b) => a.order - b.order)
        );
        const readyPokemon = typedPokemonSix.find(
          (pokemon) => pokemon.actualHp > 0
        );
        if (readyPokemon) {
          context?.setCurrentPokemon(readyPokemon);
          npcBattleContext?.setBattleState(BattleState.NOT_STARTED);
        } else {
          console.log("pokemons are not ready");
          npcBattleContext?.setBattleState(BattleState.CANNOT_START);
        }
      } catch (error) {
        console.error("error occurs: ", error);
        // there will be enum for error
      } finally {
        setLoading(false);
      }
    },
    [context, npcBattleContext]
  );

  useEffect(() => {
    // check if ther is data, context and if pokemons from six are already fetched
    if (
      !data ||
      !context ||
      context.pokemonsFromSix.length > 0 ||
      loading ||
      data.user.pokemonIds.length === 0
    )
      return;
    const username = data.user.name;
    console.log("start with fetching");
    fetchAndSetPokemon(username);
  }, [data?.user.userSix, data?.user.day, loading, fetchAndSetPokemon]);

  return { loading, fetchAndSetPokemon };
};

export default useLoadSixToContext;
