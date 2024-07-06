"use client";
import { useContext, useEffect, useState } from "react";
import { getProfile, getSix, getUserPokemons } from "./action";
import { useSession } from "next-auth/react";
import { UserContext } from "@/contexts/UserContext";
import UserPokemon from "./UserPokemon";
import { User } from "@/types/user";
import UserProfile from "./UserProfile";
import { Pokemon } from "@/types/pokemon";
import "./profile.css";
import { PokemonContext } from "@/contexts/PokemonContext";
import Loader from "@/components/Loader";
import UserSix from "./UserSix";

interface ErrorResponse {
  error: string;
}

type UserResponse = User | ErrorResponse | null;

const ProfilePage = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeUserSix, setActiveUserSix] = useState("");
  const context = useContext(UserContext);
  const pokemonContext = useContext(PokemonContext);

  if (!context && pokemonContext) {
    console.log("there is not context");
  }

  const currentUser = context?.currentUser;
  const setUserPokemons = pokemonContext?.setUserPokemons;

  useEffect(() => {
    if (currentUser) {
      handlePokemons();
    }
    if (pokemonContext) {
      console.log("pokemoni z contextu: ", pokemonContext.userPokemons);
    }
    console.log("user is: ", currentUser?.userSix);
  }, [currentUser]);

  const handlePokemons = async () => {
    if (currentUser) {
      const pokemons = await getUserPokemons(currentUser.id);
      const pokemonSix = await getSix(currentUser.name);

      if (pokemons) {
        setPokemons(pokemons);
        console.log("pokemons are set");
      }
      if (setUserPokemons) {
        setUserPokemons(pokemons);
        pokemonContext.setPokemonsFromSix(pokemonSix);
      }
      setLoading(true);
      console.log("pokemons", pokemons);
    } else {
      console.log("user have any pokemon", currentUser);
    }
  };

  return (
    <main className="container-profile">
      {currentUser && <UserProfile user={currentUser} />}
      {currentUser?.userSix ? (
        <section className="profile-six">
          {currentUser.userSix.map((pokemonId) => (
            <UserSix
              key={pokemonId}
              pokemonId={pokemonId}
              active={activeUserSix}
              setActive={setActiveUserSix}
            />
          ))}
        </section>
      ) : (
        <h2>Nothing here</h2>
      )}
      {loading ? (
        <section className="profile-pokemons">
          {pokemons &&
            pokemons.map((pokemon, index) => (
              <UserPokemon key={index} pokemon={pokemon} />
            ))}
        </section>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default ProfilePage;
