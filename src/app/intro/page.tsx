"use client";
import { useRouter } from "next/navigation";
import { nextChapter } from "@/utils/actions/next-chapter";
import { Toast } from "@/components/ui/toast";
import { useState } from "react";
import FirstSlide from "./first-slide";
import SecondSlide from "./second-slide";
import ThirdSlide from "./third-slide";

export default function IntroPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const handleNext = async () => {
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <FirstSlide handleNext={handleNext} />;
      case 2:
        return <SecondSlide handleNext={handleNext} handlePrev={handlePrev} />;
      case 3:
        return <ThirdSlide handlePrev={handlePrev} />;
      default:
        return null;
    }
  };

  return (
    <div className="blur-on no-nav">
      <main className="max-width mx-auto mt-36">
        {renderStep()}
        {error && (
          <Toast
            variant="error"
            message={error}
            isVisible={!!error}
            onClose={() => setError(null)}
          />
        )}
      </main>
    </div>
  );
}
