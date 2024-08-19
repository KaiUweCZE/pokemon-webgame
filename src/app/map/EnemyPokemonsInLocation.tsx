import { pokemonBattleData } from "@/data/pokemonBattleData";
import { mapData } from "./mapData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EnemyPokemonsRound from "./EnemyPokemonsRound";
import { useContext } from "react";
import { PokemonContext } from "@/contexts/PokemonContext";

interface LocationType {
  location: string;
}

const EnemyPokemonsInLocation = ({ location }: LocationType) => {
  const router = useRouter();
  const context = useContext(PokemonContext);
  const locationData = mapData.find((e) => e.name === location);
  const rounds = locationData?.rounds;

  const logger = () => {
    console.log("");
  };
  return (
    <section className="about-enemy-pokemons">
      <h3>Pokemons in this area</h3>
      <ul>
        {rounds?.map((round) => (
          <EnemyPokemonsRound
            key={round.id}
            pokemonIds={round.pokemons}
            round={round.id}
          />
        ))}
      </ul>
      <button
        className="button-primary"
        onClick={() => {
          router.push("/battle");
        }}
      >
        explore
      </button>
    </section>
  );
};

export default EnemyPokemonsInLocation;
