import { IntroCard } from "@/components/ui/intro/intro-card";
import { characters } from "@/images";
import Image from "next/image";

const FirstSlide = ({ handleNext }: { handleNext: () => void }) => {
  return (
    <div className="first-slide intro-slide">
      <Image src={characters.profBloom.src} alt={characters.profBloom.alt} height={500} />
      <IntroCard
        headline="Welcome to Pokemon!"
        size="md"
        variant="light"
        ctaText="next"
        onCtaClick={handleNext}
      >
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet, iusto? Nulla magnam,
          quidem quod incidunt sed illo, tempore vitae nobis sapiente cupiditate iusto itaque,
          delectus totam corporis eos obcaecati at.
        </p>
      </IntroCard>
    </div>
  );
};

export default FirstSlide;
