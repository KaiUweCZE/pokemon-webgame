import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import { addPokemonToSix, removePokemon } from "./action";
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

  const handleDelete = async () => {
    try {
      if (user && !data?.user.userSix.includes(pokemon.id)) {
        const updatedUser = await removePokemon(pokemon.id, user?.name);
        if (updatedUser) {
          await update({
            ...data,
            user: {
              ...data?.user,
              PokemonIds: updatedUser.pokemonIds,
            },
          });
        }
      } else {
        console.log("you cannot delete pokemon from six");
      }
    } catch (err) {
      console.error("error occurs while deleting", err);
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
          />
        )}

        <ul className="profile-pokemon-info">
          <li>
            {pokemon.name} lvl. {pokemon.level}
          </li>

          {pokemon.type &&
            pokemon.type.map((type, index) => (
              <li key={index} className={`pokemon-type ${type}`}>
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
          <li>{pokemon.id}</li>
          <li>
            <button className="button-primary" onClick={handleAddToSix}>
              To six
            </button>
            <button className="button-primary" onClick={handleDelete}>
              delete
            </button>
          </li>
        </ul>
        {data?.user.userSix.includes(pokemon.id) && (
          <div className="sticker">6</div>
        )}
      </div>{" "}
      {error && <ErrorMessage message="This pokemon is in your six already" />}
    </>
  );
};

export default UserPokemon;
