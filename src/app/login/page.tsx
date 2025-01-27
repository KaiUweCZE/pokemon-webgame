"use client";
import { useState } from "react";
import SignInForm from "./signin-form";
import SignUpForm from "./signup-form";
import { Button } from "@/components/ui/primitives/button";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  return (
    <div className="mx-auto mt-24 w-full max-w-md rounded-lg border-2 border-indigo-950 bg-indigo-50 p-8 shadow-lg">
      <div
        role="tablist"
        aria-label="Login and signup tabs"
        className="mx-auto mb-6 flex w-fit gap-8"
      >
        <Button
          role="tab"
          variant="link"
          active={activeTab === "signin"}
          onClick={() => setActiveTab("signin")}
          className="text-lg"
          aria-selected={activeTab === "signin"}
          aria-controls="signin-tab"
          id="signin"
        >
          <span className={activeTab === "signin" ? "text-slate-950" : "text-slate-500"}>
            Sign In
          </span>
        </Button>
        <Button
          role="tab"
          variant="link"
          active={activeTab === "signup"}
          onClick={() => setActiveTab("signup")}
          className="text-lg"
          aria-selected={activeTab === "signup"}
          aria-controls="signup-tab"
          id="signup"
        >
          <span className={activeTab === "signup" ? "text-slate-950" : "text-slate-500"}>
            Sign Up
          </span>
        </Button>
      </div>

      <div role="tabpanel" id={`${activeTab}-tab`} aria-labelledby={activeTab} className="mt-8">
        {activeTab === "signin" ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
}
