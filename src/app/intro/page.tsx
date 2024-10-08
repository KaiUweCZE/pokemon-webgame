"use client";
import "./intro.css";
import { useContext, useEffect, useState } from "react";
import ThirdScene from "./scenes/ThirdScene";
import SecondScene from "./scenes/SecondScene";
import FirstScene from "./scenes/FirstScene";
import ChapterDone from "@/components/ChapterDone";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const IntroPage = () => {
  const { data } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(0);

  return (
    <main className="container-intro">
      {data?.user.chapter === 0 ? (
        <>
          {step === 0 && <FirstScene setStep={setStep} />}
          {step === 1 && data && (
            <SecondScene
              step={step}
              username={data?.user.name}
              setStep={setStep}
            />
          )}
          {step === 2 && <ThirdScene />}
        </>
      ) : (
        <ChapterDone />
      )}
    </main>
  );
};

export default IntroPage;
