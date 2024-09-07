"use client";
import { useState } from "react";
import UserSixItem from "./UserSixItem";
import { Pokemon } from "@/types/pokemon";
import { PokemonWithOrder } from "@/contexts/PokemonContext";

interface UserSixProps {
  six: PokemonWithOrder[];
  username: string;
}

const UserSix = ({ username, six }: UserSixProps) => {
  const [activeUserSix, setActiveUserSix] = useState("");
  return (
    <section className="profile-six">
      {six.map((pokemon) => (
        <UserSixItem
          key={pokemon.id}
          username={username}
          pokemon={pokemon}
          active={activeUserSix}
          setActive={setActiveUserSix}
        />
      ))}
    </section>
  );
};

export default UserSix;
