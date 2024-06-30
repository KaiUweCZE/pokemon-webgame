"use client";
import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";
import { json } from "stream/consumers";

const Home = () => {
  //const { data: session, status, update } = useSession();
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  const loger = () => {
    /*const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      context.setCurrentUser(JSON.parse(storedUser))
    }*/
    
    console.log("context", context.currentUser);
  };


  return (
    <main className="container-home">
      <p>{/*JSON.stringify(session?.user?.name)*/}</p>
      <button onClick={loger}>click</button>
      {
        context?.currentUser ? <p>{context.currentUser.name}</p> : <p>nothing</p>
      }
    </main>
  );
};

export default Home;
