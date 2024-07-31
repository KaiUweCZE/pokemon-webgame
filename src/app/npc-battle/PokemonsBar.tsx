import Image from "next/image";
import pokeballIcon from "@/assets/images/icons/pokeball.png";

const PokemonsBar = () => {
  return (
    <div className="pokemons-bar">
      <Image src={pokeballIcon} width={24} alt="pokeball" />
      <Image src={pokeballIcon} width={24} alt="pokeball" />
      <Image src={pokeballIcon} width={24} alt="pokeball" />
      <Image src={pokeballIcon} width={24} alt="pokeball" />
      <Image src={pokeballIcon} width={24} alt="pokeball" />
      <Image src={pokeballIcon} width={24} alt="pokeball" />
    </div>
  );
};

export default PokemonsBar;
