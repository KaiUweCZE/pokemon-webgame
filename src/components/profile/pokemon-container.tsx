import { Pokemon } from "@/types/pokemon";

interface PokemonContainerProps {
  pokemons: Pokemon[];
}

const PokemonContainer = ({ pokemons }: PokemonContainerProps) => {
  return <section className="bg-primary-dark grid w-fit grid-cols-2"></section>;
};

export default PokemonContainer;
