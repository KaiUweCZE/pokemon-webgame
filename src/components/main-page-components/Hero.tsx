import Image from "next/image";
import profBloom from "@/assets/images/characters/profbloom.webp";

const Hero = () => {
  return (
    <section className="section-home">
      <div className="box-home">
        <Image src={profBloom} alt="professor Bloom" height={400} />
        <article>
          <h2>Tekel</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem labore, veniam quam perferendis sunt provident modi
            illo. Dicta odio placeat, et dolores, impedit, natus explicabo
            ratione culpa dolore ab excepturi! In, nisi impedit culpa quos
            sapiente officia sequi! Aliquid optio, magnam dolore autem commodi
            nulla? Voluptatibus, ex vero optio rerum magni quam facere sequi
            provident odio, et, eos ut velit! Repellendus, provident asperiores
            numquam cum voluptatum itaque quasi reiciendis a ullam minima
            delectus corporis officia dolore natus commodi aliquam reprehenderit
            laboriosam dolorum maxime ipsam necessitatibus accusantium?
            Reprehenderit obcaecati modi tempora!
          </p>
        </article>
      </div>
    </section>
  );
};

export default Hero;
