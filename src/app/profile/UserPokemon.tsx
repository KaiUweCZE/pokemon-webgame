import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import { addPokemonToSix } from "./action";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import { generatePokemonImage } from "@/utils/generatePokemonImage";
import HpBar from "@/components/HpBar";
import EnergyBar from "@/components/EnergyBar";
import ErrorMessage from "@/components/ErrorMessage";
import { generatePokemonTypes } from "@/utils/generatePokemonTypes";
import { useSession } from "next-auth/react";

interface UserPokemonProps {
  pokemon: Pokemon;
}

const UserPokemon: React.FC<UserPokemonProps> = ({ pokemon }) => {
  const { data, update } = useSession();
  const [error, setError] = useState(false);
  const img = generatePokemonImage(pokemon.name);
  const types = generatePokemonTypes(pokemon.name);

  const user = data?.user;

  const handleAddToSix = async () => {
    if (user) {
      try {
        const updatedUser = await addPokemonToSix(user.name, pokemon.id);
        console.log("updated user", updatedUser);

        if (updatedUser) {
          await update({
            ...data,
            user: {
              ...data?.user,
              userSix: updatedUser?.userSix,
            },
          });
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
            onClick={handleAddToSix}
          />
        )}

        <ul className="profile-pokemon-info">
          <li>
            {pokemon.name} lvl. {pokemon.level}
          </li>

          {pokemon.type &&
            pokemon.type.map((type) => (
              <li key={pokemon.id} className={`pokemon-type ${type}`}>
                {type}
              </li>
            ))}
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
        {data?.user.userSix.includes(pokemon.id) && (
          <div className="sticker">6</div>
        )}
      </div>{" "}
      {error && <ErrorMessage />}
    </>
  );
};

export default UserPokemon;
