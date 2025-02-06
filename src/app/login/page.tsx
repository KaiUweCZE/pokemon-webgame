"use client";
import { useState } from "react";
import SignInForm from "@/components/login/signin-form";
import SignUpForm from "@/components/login/signup-form";
import { Button } from "@/components/ui/primitives/button";
import { GradientBackground } from "@/components/ui/primitives/gradient-background";
import { LogInIcon, UserRoundPlus } from "lucide-react";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTabClick = (tab: "signin" | "signup") => {
    if (tab === activeTab) return;
    setIsAnimating(true);

    setTimeout(() => {
      setActiveTab(tab);
      setIsAnimating(false);
    }, 300);
  };
  return (
    <main className="slide-in relative mx-auto mt-24 grid h-fit w-full max-w-md overflow-hidden rounded-sm border-2 border-purple-200/60 bg-primary/70 p-8 shadow-primary backdrop-blur-sm">
      <Button
        role="tab"
        type="button"
        variant="basic"
        size="icon"
        onClick={() => handleTabClick(activeTab === "signup" ? "signin" : "signup")}
        className="absolute -right-0 -top-0 z-10 bg-slate-950/20 p-1 text-lg shadow-secondary"
        aria-selected={activeTab === "signup"}
        aria-controls="signup-tab"
        id="signup"
      >
        <div
          className={`transition-transform duration-300 ${isAnimating ? "scale-0" : "scale-100"}`}
        >
          {activeTab === "signin" ? (
            <UserRoundPlus className="h-4 w-4 text-primary-text" />
          ) : (
            <LogInIcon className="h-4 w-4 text-primary-text" />
          )}
        </div>
        <div
          className={`absolute inset-0 -z-10 rounded-sm bg-element/20 transition-all duration-500 ease-in-out ${activeTab === "signup" ? "scale-[100]" : "scale-1"}`}
        />
      </Button>

      <div
        role="tabpanel"
        id={`${activeTab}-tab`}
        aria-labelledby={activeTab}
        className="z-10 mt-8 grid gap-6"
      >
        {activeTab === "signin" ? <SignInForm /> : <SignUpForm />}
      </div>
      <GradientBackground
        intensity="high"
        variant="pink"
        direction="bottom-left"
        className="z-1 rounded-none"
      />
    </main>
  );
}
