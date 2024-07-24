"use client";
import { useContext, useState } from "react";
import { signIn } from "next-auth/react";
import "./login.css";
import { UserContext } from "@/contexts/UserContext";
import { getUser } from "./action";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const context = useContext(UserContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = await getUser(username);

    if (newUser) {
      context?.setCurrentUser(newUser);

      if ("error" in newUser) {
        console.error("Error:", newUser.error);
        return;
      }

      await signIn("credentials", {
        name: username,
        password,
        redirect: false,
      });

      // Check user's chapter and redirect accordingly
      if (newUser.chapter > 0) {
        router.push("/profile");
      } else {
        router.push("/intro");
      }
    }
  };

  return (
    <div className="wrapper-form">
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label htmlFor="name">Username: </label>
          <input
            type="text"
            name="name"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id=""
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="button-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
