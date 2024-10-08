import Image from "next/image";
import pokeballIcon from "@/assets/images/icons/pokeball.png";

interface PokemonBar {
  name: string;
  actualHp: number;
}

interface PokemonsBarProps {
  pokemons: PokemonBar[];
}

const PokemonsBar = ({ pokemons }: PokemonsBarProps) => {
  //const sixElement = Array.from()

  return (
    <div className="pokemons-bar">
      {pokemons.map((pokemon, index) => (
        <Image
          key={pokemon.name + index}
          className={pokemon.actualHp <= 0 ? "done" : ""}
          src={pokeballIcon}
          alt="pokeball"
          width={24}
        />
      ))}
    </div>
  );
};

export default PokemonsBar;
