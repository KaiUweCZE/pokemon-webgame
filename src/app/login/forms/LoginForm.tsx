"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import "./login.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn("credentials", {
      username,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label htmlFor="name">username: </label>
      <input
        type="text"
        name="name"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">password: </label>
      <input
        type="password"
        name="password"
        id=""
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button-primary" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
