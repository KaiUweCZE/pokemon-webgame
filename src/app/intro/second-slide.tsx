import { IntroCard } from "@/components/ui/intro/intro-card";
import { Button } from "@/components/ui/primitives/button";
import { characters } from "@/images";
import Image from "next/image";
import { useState } from "react";
import { updateProfileImage } from "./actions";
import { Toast } from "@/components/ui/toast";

interface SecondSlideProps {
  handleNext: () => void;
  handlePrev: () => void;
}

export const SecondSlide = ({ handleNext, handlePrev }: SecondSlideProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const handleSelectProfile = async (profile: string) => {
    setIsLoading(true);
    try {
      await updateProfileImage(profile);
      setSelectedProfile(profile);
      handleNext();
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="intro-slide second-slide relative mx-auto w-full">
      <Image
        src={characters.mainChar1.src}
        alt={characters.mainChar1.alt}
        height={500}
        className="pick-character"
        onClick={() => !isLoading && handleSelectProfile("mainChar1")}
      />
      <Image
        src={characters.mainChar2.src}
        alt={characters.mainChar2.alt}
        height={500}
        className="pick-character"
        onClick={() => !isLoading && handleSelectProfile("mainChar2")}
      />

      <IntroCard
        variant="light"
        ctaText="prev"
        onCtaClick={handlePrev}
        className="col-span-2 place-self-center"
      >
        <p>Choose one of the profiles and proceed to the Pokémon selection</p>
      </IntroCard>

      {error && (
        <Toast message={error} variant="error" isVisible={!!error} onClose={() => setError(null)} />
      )}
    </div>
  );
};

export default SecondSlide;
