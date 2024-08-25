import Image from "next/image";
import golias from "@/assets/images/characters/golias.webp";
import nana from "@/assets/images/characters/nana.webp";
import confusitionus from "@/assets/images/characters/confusitionus2.webp";
import makatai from "@/assets/images/characters/makatai.webp";
import EliteCard from "./EliteCard";
import { useState } from "react";

const EliteFour = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="elite">
      <h2>ELITE FOUR</h2>
      <div className="elite-four">
        <EliteCard
          img={golias}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          index={1}
          name="Golias"
        />
        <EliteCard
          img={nana}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          index={2}
          name="Nana"
        />
        <EliteCard
          img={confusitionus}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          index={3}
          name="Confusitionus"
        />
        <EliteCard
          img={makatai}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          index={4}
          name="Makatai"
        />
      </div>
    </section>
  );
};

export default EliteFour;
