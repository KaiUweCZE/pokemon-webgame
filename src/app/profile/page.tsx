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
import { log } from "console";

interface ErrorResponse {
  error: string;
}

type UserResponse = User | ErrorResponse | null;

const ProfilePage = () => {
  const { data, update } = useSession();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);

  const pokemonContext = useContext(PokemonContext);

  const user = data?.user;
  if (!pokemonContext) {
    throw new Error("pokemon context is missing");
  }

  const setUserPokemons = pokemonContext?.setUserPokemons;

  useEffect(() => {
    if (user) {
      handlePokemons();
    }
    if (pokemonContext) {
      console.log("pokemoni z contextu: ", pokemonContext.userPokemons);
    }
    console.log("user six is: ", user?.userSix);
  }, [user?.pokemonIds]);

  const handlePokemons = async () => {
    if (user) {
      const pokemons = await getUserPokemons(user.id);
      const pokemonSix = await getSix(user.name);

      if (pokemons) {
        setPokemons(pokemons);
        console.log("pokemons are set");
      }
      if (setUserPokemons) {
        setUserPokemons(pokemons);
        if (pokemonSix) {
          pokemonContext.setPokemonsFromSix(pokemonSix);
        }
      }
      //await update(data, data.user: {...data.user, })
      setLoading(true);
      console.log("pokemons", pokemons);
      console.log("pokemon isx: ", pokemonSix);
    } else {
      console.log("user have any pokemon", user);
    }
  };

  return (
    <main className="container-profile">
      {user && <UserProfile user={user} />}
      {user?.userSix && (
        <UserSix username={user.name} six={pokemonContext.pokemonsFromSix} />
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
