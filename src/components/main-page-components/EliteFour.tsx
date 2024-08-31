import golias from "@/assets/images/characters/golias.webp";
import nana from "@/assets/images/characters/nana.webp";
import confusitionus from "@/assets/images/characters/confusitionus2.webp";
import makatai from "@/assets/images/characters/makatai.webp";
import EliteCard from "./EliteCard";

const EliteFour = () => {
  return (
    <section className="elite">
      <h2>ELITE FOUR</h2>
      <div className="elite-four">
        <EliteCard img={golias} index={1} name="Golias" />
        <EliteCard img={nana} index={2} name="Nana" />
        <EliteCard img={confusitionus} index={3} name="Confusitionus" />
        <EliteCard img={makatai} index={4} name="Makatai" />
      </div>
    </section>
  );
};

export default EliteFour;
