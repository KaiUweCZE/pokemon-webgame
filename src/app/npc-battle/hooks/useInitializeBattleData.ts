import { useContext, useEffect, useMemo } from "react";
import { NpcBattleContext } from "../NpcBattleContext";
import { PokemonContext } from "@/contexts/PokemonContext";
import { npcData } from "@/data/npcData";
import { Oponent } from "@/types/oponent";
import { oponentPokemon } from "@/data/npcPokemons";
import { useSession } from "next-auth/react";
import firstMainCharBack from "@/assets/images/main-char-1-back.webp";
import secondMainCharBack from "@/assets/images/main-char-2-back2.webp";

const useInitializeBattleData = (name: string) => {
  const { data } = useSession();
  const npcBattleContext = useContext(NpcBattleContext);
  const pokemonContext = useContext(PokemonContext);
  const charImg =
    data?.user.profileImg === "1" ? firstMainCharBack : secondMainCharBack;
  const oponentData = useMemo(
    () => npcData.find((npc) => npc.name === name),
    [name]
  );

  useEffect(() => {
    if (oponentData) {
      const typedOponentData: Oponent = {
        ...oponentData,
        pokemons: oponentData.pokemons as oponentPokemon[],
      };
      npcBattleContext?.setOponent(typedOponentData);
    }
    if (!pokemonContext?.currentPokemon) {
      pokemonContext?.setCurrentPokemon(pokemonContext.pokemonsFromSix[0]);
    }
  }, [name]);

  return { npcBattleContext, pokemonContext, oponentData, charImg };
};

export default useInitializeBattleData;
