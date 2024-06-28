"use client";
import { getCsrfToken, getSession, useSession } from "next-auth/react";
import { getUser } from "./api/action";

const Home = () => {
  //const { data: session, status, update } = useSession();

  const loger = async () => {
    const session = await getSession();
    const csrfToken = await getCsrfToken();
    console.log(session, csrfToken);
  };

  return (
    <main className="container-home">
      <p>{/*JSON.stringify(session?.user?.name)*/}</p>
      <button onClick={loger}>click</button>
    </main>
  );
};

export default Home;
