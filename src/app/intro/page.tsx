"use client";
import { useRouter } from "next/navigation";
import { updateChapter } from "@/utils/actions/update-chapter";
import { Toast } from "@/components/ui/toast";
import { useState } from "react";
import FirstSlide from "./first-slide";
import SecondSlide from "./second-slide";

enum IntroStep {
  Welcome = 1,
  ChooseCharacter = 2,
  ChoosePokemon = 3,
}

export default function IntroPage() {
  const router = useRouter();
  const [step, setStep] = useState<IntroStep>(IntroStep.Welcome);
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    setStep((currentStep) => {
      if (currentStep === IntroStep.ChoosePokemon) {
        handleStartJourney();
        return currentStep;
      }
      return currentStep + 1;
    });
  };

  const handlePrev = () => {
    setStep((currentStep) => {
      return currentStep - 1;
    });
  };

  const handleStartJourney = async () => {
    try {
      await updateChapter(1);
      router.push("/");
    } catch (err) {
      setError("Failed to start journey. Please try again.");
    }
  };

  const renderSlide = () => {
    switch (step) {
      case IntroStep.Welcome:
        return <FirstSlide handleNext={handleNext} />;
      case IntroStep.ChooseCharacter:
        return <SecondSlide handleNext={handleNext} handlePrev={handlePrev} />;
      case IntroStep.ChoosePokemon:
        return (
          <div>
            <h1>Choose Pokemon</h1>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="blur-on no-nav">
      <main className="max-width mx-auto mt-36">{renderSlide()}</main>

      {error && (
        <Toast message={error} variant="error" isVisible={!!error} onClose={() => setError(null)} />
      )}
    </div>
  );
}
