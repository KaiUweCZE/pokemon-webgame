import NpcBattleMenu from "./NpcBattleMenu";
import OponentImage from "./OponentImage";
import UserImage from "./UserImage";
import mainCharBack from "@/assets/images/main-char-2-back2.webp";
import useChangeOponentPokemon from "./hooks/useChangeOponentPokemon";
import { useBattleState } from "./hooks/useBattleState";
import useInitializeBattleData from "./hooks/useInitializeBattleData";

interface BattlefieldProps {
  name: string;
}

const NpcBattlefield = ({ name }: BattlefieldProps) => {
  const { npcBattleContext, pokemonContext, oponentData, charImg } =
    useInitializeBattleData(name);

  if (!npcBattleContext || !pokemonContext) {
    return <div>Loading...</div>;
  }
  const { oponentPokemons, currentOponentPokemon } = npcBattleContext;
  const { userPokemons, currentPokemon } = pokemonContext;

  useBattleState(
    userPokemons,
    oponentPokemons,
    currentOponentPokemon,
    currentPokemon
  );
  useChangeOponentPokemon();

  const handleCheck = () => {
    console.log("oponent: ", oponentData, npcBattleContext);
    console.log("oponents pokemon: ", npcBattleContext?.oponentPokemons);
    console.log("user pokemon context: ", pokemonContext);
    console.log("oponent name: ", name);
  };

  return (
    <>
      <button onClick={handleCheck}>click</button>
      <div className="container-battlefield">
        {oponentData?.img && <OponentImage img={oponentData.img} />}
        <UserImage img={charImg} />
        <NpcBattleMenu />
      </div>
    </>
  );
};

export default NpcBattlefield;
