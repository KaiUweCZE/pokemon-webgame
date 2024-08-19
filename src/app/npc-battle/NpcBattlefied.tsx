import { npcData } from "@/data/npcData";
import NpcBattleMenu from "./NpcBattleMenu";
import OponentImage from "./OponentImage";
import UserImage from "./UserImage";
import mainCharBack from "@/assets/images/main-char-2-back2.webp";
import { NpcBattleContext } from "./NpcBattleContext";
import { useContext, useEffect } from "react";
import { PokemonContext } from "@/contexts/PokemonContext";
import useChangeOponentPokemon from "./hooks/useChangeOponentPokemon";
import { Oponent } from "@/types/oponent";
import { oponentPokemon } from "@/data/npcPokemons";

interface BattlefieldProps {
  name: string;
}

const NpcBattlefield = ({ name }: BattlefieldProps) => {
  const context = useContext(NpcBattleContext);
  const contextPokemon = useContext(PokemonContext);
  const oponentData = npcData.find((npc) => npc.name === name);

  const handleCheck = () => {
    console.log("oponent: ", oponentData, context);
    console.log("oponents pokemon: ", context?.oponentPokemons);
    console.log("user pokemon context: ", contextPokemon);
    console.log("oponent name: ", name);
  };

  useChangeOponentPokemon();
  useEffect(() => {
    if (oponentData) {
      // change type of oponentData to Oponent
      const typedOponentData: Oponent = {
        ...oponentData,
        pokemons: oponentData.pokemons as oponentPokemon[],
      };
      context?.setOponent(typedOponentData);
    }
    if (!contextPokemon?.currentPokemon) {
      contextPokemon?.setCurrentPokemon(contextPokemon.pokemonsFromSix[0]);
    }
  }, []);
  return (
    <>
      <button onClick={handleCheck}>click</button>
      <div className="container-battlefield">
        {oponentData?.img && <OponentImage img={oponentData.img} />}
        <UserImage img={mainCharBack} />
        <NpcBattleMenu />
      </div>
    </>
  );
};

export default NpcBattlefield;
