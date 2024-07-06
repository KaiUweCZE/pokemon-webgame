import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import { addPokemonToSix } from "./action";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { generatePokemonImage } from "@/utils/generatePokemonImage";

interface UserPokemonProps {
  pokemon: Pokemon;
}

const UserPokemon: React.FC<UserPokemonProps> = ({ pokemon }) => {
  const context = useContext(UserContext);
  const img = generatePokemonImage(pokemon.name);

  if (!context) {
    console.log("context is missing");

    throw new Error();
  }

  const handleAddToSix = async () => {
    if (context.currentUser) {
      const updatedUser = await addPokemonToSix(
        context.currentUser?.name,
        pokemon.id
      );
      console.log("updated user", updatedUser);

      context.setCurrentUser(updatedUser);
    }
  };

  return (
    <div className="pokemon-box">
      {img && (
        <Image
          src={img}
          alt={`${pokemon.name} image`}
          width={150}
          height={150}
          loading="lazy"
          onClick={handleAddToSix}
        />
      )}

      <ul className="profile-pokemon-info">
        <li>name: {pokemon.name}</li>
        <li>level: {pokemon.level}</li>
        <li>energy: {pokemon.energy}</li>
      </ul>
    </div>
  );
};

export default UserPokemon;
