"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import "./login.css";
import { getUser } from "./action";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const user = await getUser(username);

    if (user) {
      if ("error" in user) {
        setError("An error occured during login");
        console.error("Error:", user.error);
        setIsLoading(false);
        return;
      }

      const result = await signIn("credentials", {
        name: username,
        password,
        redirect: false,
      });

      // Check user's chapter and redirect accordingly
      if (result?.ok) {
        if (user.chapter > 0) {
          router.push("/profile");
        } else {
          router.push("/intro");
        }
      } else {
        setError("An error occured during login");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="wrapper-form">
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label htmlFor="name">Username: </label>
          <input
            type="text"
            name="name"
            onChange={(e) => {
              if (error) {
                setError("");
              }
              setUsername(e.target.value);
            }}
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
          {error && <span className="error-login">{error}</span>}
        </div>

        <button className="button-primary" type="submit" disabled={isLoading}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
