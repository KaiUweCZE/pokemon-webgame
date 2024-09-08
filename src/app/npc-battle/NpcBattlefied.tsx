import BattleMenu from "@/components/battle/BattleMenu";
import OponentImage from "./OponentImage";
import UserImage from "./UserImage";
import useChangeOponentPokemon from "./hooks/useChangeOponentPokemon";
import { useBattleState } from "./hooks/useBattleState";
import useInitializeBattleData from "./hooks/useInitializeBattleData";
import useLoadSixToContext from "@/hooks/useLoadSixToContext";
import Loader from "@/components/Loader";
import useDamage from "./hooks/useDamage";

interface BattlefieldProps {
  name: string;
}

const NpcBattlefield = ({ name }: BattlefieldProps) => {
  const { npcBattleContext, pokemonContext, oponentData, charImg } =
    useInitializeBattleData(name);
  const { loading } = useLoadSixToContext();

  useBattleState(
    pokemonContext?.pokemonsFromSix ?? null,
    npcBattleContext?.oponentPokemons ?? null,
    pokemonContext?.currentPokemon ?? null,
    npcBattleContext?.currentOponentPokemon ?? null
  );
  useChangeOponentPokemon();
  useDamage();

  if (!npcBattleContext || !pokemonContext) {
    return <Loader />;
  }

  const handleCheck = () => {
    console.log("oponent: ", oponentData, npcBattleContext);
    console.log("oponents pokemon: ", npcBattleContext?.oponentPokemons);
    console.log("user pokemon context: ", pokemonContext);
    console.log("oponent name: ", name);
    console.log("check battle state: ", npcBattleContext.battleState);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <button onClick={handleCheck}>click</button>
          <div className="container-battlefield">
            {oponentData?.img && <OponentImage img={oponentData.img} />}
            <UserImage img={charImg} />
            <BattleMenu />
          </div>{" "}
        </>
      )}
    </>
  );
};

export default NpcBattlefield;
