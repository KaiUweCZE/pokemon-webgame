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
      name: username,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
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
  );
};

export default LoginForm;
