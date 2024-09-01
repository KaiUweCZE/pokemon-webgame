import React, { useState } from "react";
import { signUp } from "./action";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistred, setIsRegistred] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signUp(username, password);
      if (result) {
        setIsRegistred(true);
      }
    } catch (error) {
      setError("An error occurred during sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper-form">
      <form className="login-form">
        <div className="login-form-box">
          <label htmlFor="name">Username:</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            onChange={(e) => {
              if (error) {
                setError("");
              }
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="login-form-box">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <span className="login-error">{error}</span>}
        </div>
        <button
          className="button-primary"
          onClick={handleSignUp}
          disabled={isLoading}
        >
          Sign up
        </button>
        <ul>
          <li className={username.length > 0 ? "ok" : "incorrect"}>
            username: atleast one char
          </li>
          <li className={password.length > 0 ? "ok" : "incorrect"}>
            password: atleast one char
          </li>
        </ul>
        {isRegistred && (
          <span className="registration-succes">
            Registration was successful
          </span>
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
