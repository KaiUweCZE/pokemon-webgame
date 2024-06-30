"use client";
import { useState } from "react";
import { getProfile } from "./action";
import { useSession } from "next-auth/react";

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
  const {data} = useSession()

  const handleUser = async (e: any) => {
    e.preventDefault();
    const username = data?.user?.name as string
    const newUser = await getProfile(username);
    setUser(newUser);
    console.log(user);
    console.log(data);
       
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
