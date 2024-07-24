import Image from "next/image";
import golias from "@/assets/images/characters/golias.webp";
import nana from "@/assets/images/characters/nana.webp";
import confusitionus from "@/assets/images/characters/confusitionus2.webp";
import makatai from "@/assets/images/characters/makatai.webp";
import EliteCard from "./EliteCard";
import { useState } from "react";

const EliteFour = () => {
  const [active, setActive] = useState({ isActive: false, index: 0 });

  return (
    <section className="elite">
      <h2>ELITE FOUR</h2>
      <div className="elite-four">
        <EliteCard
          img={golias}
          active={active}
          setActive={setActive}
          index={1}
          name="Golias"
        />
        <EliteCard
          img={nana}
          active={active}
          setActive={setActive}
          index={2}
          name="Nana"
        />
        <EliteCard
          img={confusitionus}
          active={active}
          setActive={setActive}
          index={3}
          name="Confusitionus"
        />
        <EliteCard
          img={makatai}
          active={active}
          setActive={setActive}
          index={4}
          name="Makatai"
        />
      </div>
    </section>
  );
};

export default EliteFour;
