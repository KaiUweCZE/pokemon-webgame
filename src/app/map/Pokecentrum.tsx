import { useSession } from "next-auth/react";
import { healUserSix } from "./action";
import { useContext, useState } from "react";
import { MapContext } from "./MapContext";
import HeartBeatLoader from "@/components/HeartBeatLoader";
import Image from "next/image";
import nurseImg from "@/assets/images/characters/nurse.webp";
import { PokemonContext } from "@/contexts/PokemonContext";

const Pokecentrum = () => {
  const { data, update } = useSession();
  const [isHealed, setIsHealed] = useState(false);
  const context = useContext(MapContext);
  const pokemonContext = useContext(PokemonContext);

  const handleHealth = async () => {
    if (!data || !pokemonContext) return null;
    const { setPokemonsFromSix, pokemonsFromSix } = pokemonContext;
    try {
      context?.setLoader(true);
      context?.setError(false);
      const result = await healUserSix(data.user.name);
      if (!result) {
        context?.setError(true);
        return;
      }

      // add order to each pokemon and sort it in correct order
      const newPokemonSix = result.updatedPokemons
        .map((p) => {
          // ensure that the order is maintained
          const index = pokemonsFromSix.find((po) => po.id === p.id)?.order;
          return { ...p, order: index ?? 0 };
        })
        .sort((a, b) => a.order - b.order);

      // update six of user's pokemon for context
      setPokemonsFromSix(newPokemonSix);
      console.log("result: ", newPokemonSix);

      await update({
        ...data,
        user: result.updatedUser,
      });

      setIsHealed(true);
    } catch (error) {
      console.error("Error healing Pokémon:", error);
    } finally {
      context?.setLoader(false);
    }
  };
  return (
    <section className="poke-centrum">
      <Image
        className="nurse"
        src={nurseImg}
        alt="nurse"
        width={150}
        height={300}
      />
      {!isHealed && (
        <article>
          <h2>Welcome in Pokecentrum</h2>
          <p>Do you want to heal your Pokémon?</p>
          <button
            className="button-primary"
            onClick={handleHealth}
            disabled={context?.loader}
          >
            Yes
          </button>
        </article>
      )}
      {isHealed && (
        <article>
          <p>
            Your Pokémon are in good condition, you can continue your adventure!{" "}
          </p>
        </article>
      )}
      {context?.loader && <HeartBeatLoader />}
    </section>
  );
};

export default Pokecentrum;
