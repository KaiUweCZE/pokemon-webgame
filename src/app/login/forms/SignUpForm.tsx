import React from "react";
import { signUp } from "./action";

const SignUpForm = () => {
  return (
    <form>
      <div className="login-form-box">
        <label htmlFor="name">Username:</label>
        <input id="name" name="name" type="text" required />
      </div>
      <div className="login-form-box">
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
      </div>
      <div className="login-form-box-button">
        <button className="primary-button" formAction={signUp}>
          Sign up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
