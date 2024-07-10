"use client";
import "./intro.css";
import { useContext, useEffect, useState } from "react";
import ThirdScene from "./scenes/ThirdScene";
import SecondScene from "./scenes/SecondScene";
import FirstScene from "./scenes/FirstScene";
import { UserContext } from "@/contexts/UserContext";
import ChapterDone from "@/components/ChapterDone";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const IntroPage = () => {
  const { data } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const context = useContext(UserContext);

  return (
    <main className="container-intro">
      {context?.currentUser?.chapter === 0 ? (
        <>
          {step === 0 && <FirstScene setStep={setStep} />}
          {step === 1 && <SecondScene step={step} setStep={setStep} />}
          {step === 2 && <ThirdScene step={step} setStep={setStep} />}
        </>
      ) : (
        <ChapterDone />
      )}
    </main>
  );
};

export default IntroPage;
