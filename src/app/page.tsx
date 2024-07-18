"use client";
import { addItem } from "@/utils/addItem";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data, update } = useSession();

  const loger = () => {
    console.log("data: ", data?.user);
  };

  const addMoney = async () => {
    if (data?.user) {
      const updatedUser = await addItem("coins", 5, data?.user.name);
      await update({
        data,
        user: {
          ...updatedUser,
        },
      });
    }
  };
  const addPokeball = async () => {
    if (data?.user) {
      const updatedUser = await addItem("pokeballs", 5, data?.user.name);
      await update({
        data,
        user: {
          ...updatedUser,
        },
      });
    }
  };

  return (
    <main className="container-home">
      <button className="button-primary" onClick={loger}>
        click
      </button>
      <button onClick={addMoney}>add money</button>
      <button onClick={addPokeball}>add pokeball</button>
      <button>add potion</button>
    </main>
  );
};

export default Home;
