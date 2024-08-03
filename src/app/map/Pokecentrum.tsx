import { useSession } from "next-auth/react";
import { healUserSix } from "./action";
import { useContext, useState } from "react";
import { MapContext } from "./MapContext";
import MapError from "./MapError";
import HeartBeatLoader from "@/components/HeartBeatLoader";
import Image from "next/image";
import nurseImg from "@/assets/images/characters/nurse.webp";

const Pokecentrum = () => {
  const { data, update } = useSession();
  const [isHealed, setIsHealed] = useState(false);
  const context = useContext(MapContext);

  const handleHealth = async () => {
    console.log("start action");

    context?.setLoader(true);
    if (!data) return null;
    const updated = await healUserSix(data?.user.name);
    await update({
      ...data,
      user: updated?.updatedUser,
    });

    if (!updated?.updatedUser) {
      console.log("too late");
      context?.setError(true);
      context?.setLoader(false);
    } else {
      console.log(
        "succes: ",
        data?.user,
        updated?.updatedPokemons,
        updated?.updatedUser
      );
      setIsHealed(true);
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
          <p>Want to heal your Pokémon?</p>
          <button className="button-primary" onClick={handleHealth}>
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
