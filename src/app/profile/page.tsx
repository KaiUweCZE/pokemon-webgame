"use client";
import { useState } from "react";
import { getProfile } from "./action";

interface User {
  id: string;
  name: string;
  hashedPassword: string | null;
  level: number;
  pokemonIds: string[];
  location: string;
}

interface ErrorResponse {
  error: string;
}

type UserResponse = User | ErrorResponse | null;

const ProfilePage = () => {
  const [user, setUser] = useState<UserResponse>(null);

  const handleUser = async (e: any) => {
    e.preventDefault();

    const newUser = await getProfile("kai-uwe");
    setUser(newUser);
    console.log(user);
  };
  return (
    <div>
      <h2>Hi bro</h2>
      <button className="button-primary" onClick={handleUser}>
        get user{" "}
      </button>
    </div>
  );
};

export default ProfilePage;
