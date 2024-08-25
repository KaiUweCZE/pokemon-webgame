import Image from "next/image";
import goOut from "@/assets/images/gif/puff.gif";
import goIn2 from "@/assets/images/gif/goout.gif";
import goIn from "@/assets/images/gif/go-500ms-delay.gif";

const SwitchPokemonImage = () => {
  return (
    <>
      <Image
        className="user-pokemon-go-in"
        src={goIn}
        alt="user pokemon coming in"
        height={220}
      />
      {
        <Image
          src={goOut}
          className="user-pokemon-go-out"
          alt="user pokemon go out"
          height={150}
        />
      }
    </>
  );
};

export default SwitchPokemonImage;
