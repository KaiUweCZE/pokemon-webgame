"use client";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data, status } = useSession();

  console.log(data);

  return (
    <main className="container-home">
      <p>{JSON.stringify(data?.user?.name)}</p>
    </main>
  );
};

export default Home;
