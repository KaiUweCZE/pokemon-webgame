import React, { useState } from "react";
import { signUp } from "./action";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistred, setIsRegistred] = useState(false);

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    const result = await signUp(username, password);

    if (result) {
      setIsRegistred(true);
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
            onChange={(e) => setUsername(e.target.value)}
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
        </div>
        <button className="button-primary" onClick={handleSignUp}>
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
