"use client";
import { useContext, useEffect, useState } from "react";
import { getSix, getUserPokemons } from "./action";
import { useSession } from "next-auth/react";
import { User } from "@/types/user";
import UserProfile from "./UserProfile";
import { Pokemon } from "@/types/pokemon";
import "./profile.css";
import { PokemonContext } from "@/contexts/PokemonContext";
import Loader from "@/components/Loader";
import UserSix from "./UserSix";
import PokemonList from "./PokemonList";
import { ProfileContext, ProfileProvider } from "./ProfileContext";
import PokemonFullCard from "./PokemonFullCard";

const ProfilePage = () => {
  const { data, update } = useSession();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(ProfileContext);

  const pokemonContext = useContext(PokemonContext);

  const user = data?.user;
  if (!pokemonContext) {
    throw new Error("pokemon context is missing");
  }

  const setUserPokemons = pokemonContext?.setUserPokemons;
  const userPokemons = pokemonContext.userPokemons;
  useEffect(() => {
    if (user) {
      handlePokemons();
    }
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
    }
  };

  return (
    <main className="container-profile">
      <section className="section-profile">
        {user && <UserProfile user={user} />}
        {user?.userSix && (
          <UserSix username={user.name} six={pokemonContext.pokemonsFromSix} />
        )}
      </section>
      {loading ? <PokemonList pokemons={userPokemons} /> : <Loader />}
      <>
        {context?.active !== "" && context?.profilePokemon && (
          <PokemonFullCard pokemon={context?.profilePokemon} />
        )}
      </>
    </main>
  );
};

export default ProfilePage;
