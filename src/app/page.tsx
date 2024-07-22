"use client";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data, update } = useSession();

  const loger = () => {
    console.log("data: ", data?.user);
  };

  return (
    <main className="container-home">
      <button className="button-primary" onClick={loger}>
        click
      </button>
    </main>
  );
};

export default Home;
