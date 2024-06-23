"use client";
import { useState } from "react";
import LoginForm from "./forms/LoginForm";
import "./forms/login.css";
import SignUpForm from "./forms/SignUpForm";

const LoginPage = () => {
  const [formType, setFormType] = useState("login");

  const handlerChangeForm = () => {
    if (formType === "login") {
      setFormType("register");
    } else {
      setFormType("login");
    }
  };
  return (
    <div className="container-login-form">
      {formType === "login" ? <LoginForm /> : <SignUpForm />}
      <div>
        <p onClick={handlerChangeForm}>need to register?</p>
      </div>
    </div>
  );
};

export default LoginPage;
