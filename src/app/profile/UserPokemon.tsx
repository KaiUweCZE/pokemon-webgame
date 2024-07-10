import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import { addPokemonToSix } from "./action";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import { generatePokemonImage } from "@/utils/generatePokemonImage";
import HpBar from "@/components/HpBar";
import EnergyBar from "@/components/EnergyBar";
import ErrorMessage from "@/components/ErrorMessage";

interface UserPokemonProps {
  pokemon: Pokemon;
}

const UserPokemon: React.FC<UserPokemonProps> = ({ pokemon }) => {
  const context = useContext(UserContext);
  const [error, setError] = useState(false);
  const img = generatePokemonImage(pokemon.name);

  if (!context) {
    console.log("context is missing");

    throw new Error();
  }

  const handleAddToSix = async () => {
    if (context.currentUser) {
      try {
        const updatedUser = await addPokemonToSix(
          context.currentUser?.name,
          pokemon.id
        );
        console.log("updated user", updatedUser);

        if (updatedUser) {
          context.setCurrentUser(updatedUser);
          setError(false); // Clear error if update is successful
        }
      } catch (error) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      }
    }
  };

  return (
    <>
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
          <li>
            {pokemon.name} lvl. {pokemon.level}
          </li>
          <li>
            hp: <HpBar maximumHp={pokemon.hp} actualHp={pokemon.actualHp} />
          </li>
          <li>
            en:{" "}
            <EnergyBar
              maximumEnergy={pokemon.energy}
              actualEnergy={pokemon.actualEnergy}
            />
          </li>
        </ul>
      </div>{" "}
      {error && <ErrorMessage />}
    </>
  );
};

export default UserPokemon;
