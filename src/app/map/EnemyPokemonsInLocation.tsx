import { pokemonBattleData } from "@/data/pokemonBattleData";
import { mapData } from "./mapData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EnemyPokemonsRound from "./EnemyPokemonsRound";
import { useContext, useState } from "react";
import { PokemonContext } from "@/contexts/PokemonContext";
import { spendPartOfDay } from "./action";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import ErrorMessage from "@/components/ErrorMessage";

interface LocationType {
  location: string;
  username: string;
}

const EnemyPokemonsInLocation = ({ location, username }: LocationType) => {
  const router = useRouter();
  const { data, update } = useSession();
  const context = useContext(PokemonContext);
  const [error, setError] = useState("");
  const locationData = mapData.find((e) => e.name === location);
  const rounds = locationData?.rounds;

  const handleExplore = async () => {
    try {
      const updatedPartOfDay = await spendPartOfDay(username);
      console.log("updated part of day: ", updatedPartOfDay);

      if (updatedPartOfDay === null) {
        console.log("part of day was not updated");
        setError("enough for today.");
        setTimeout(() => {
          setError("");
        }, 2500);
      } else {
        await update({
          ...data,
          user: { ...data?.user, partOfDay: updatedPartOfDay },
        });
        router.push("/battle");
      }
    } catch (error) {
      console.error("Error during explore:", error);
    }
  };

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
      <button className="button-primary" onClick={handleExplore}>
        explore
      </button>
      {error && <ErrorMessage message={error} />}
    </section>
  );
};

export default EnemyPokemonsInLocation;
