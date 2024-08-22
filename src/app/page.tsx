"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import profBloom from "@/assets/images/characters/profbloom.webp";
import mapImg from "@/assets/images/map-labels.png";
import { useState } from "react";
import EliteFour from "@/components/EliteFour";
import conradImg from "@/assets/images/characters/conrad.webp";
import Logo from "@/components/Logo";

const Home = () => {
  const { data, update } = useSession();
  const [active, setActive] = useState({ isActive: false, index: 0 });

  const loger = () => {
    console.log("data: ", data?.user);
  };

  return (
    <main className="container-home">
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
              provident odio, et, eos ut velit! Repellendus, provident
              asperiores numquam cum voluptatum itaque quasi reiciendis a ullam
              minima delectus corporis officia dolore natus commodi aliquam
              reprehenderit laboriosam dolorum maxime ipsam necessitatibus
              accusantium? Reprehenderit obcaecati modi tempora!
            </p>
          </article>
        </div>
      </section>
      <section className="section-champion">
        <div className="box-champion">
          <Image src={conradImg} alt="pokemon champion of Tekel" height={400} />
          <article>
            <h2>Champion Conrad</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              ad, enim incidunt nobis id velit temporibus exercitationem aut vel
              repellendus nostrum. Illo iure itaque molestiae unde, amet
              mollitia fugit assumenda. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Vero animi ullam provident cum voluptatum quas
              nihil maiores sint sequi. Mollitia vero ducimus nemo, aliquid
              dolor vitae vel modi amet similique! Quod nesciunt placeat, illum
              aspernatur quibusdam, repudiandae sunt accusantium possimus fuga
              doloremque veritatis culpa aliquam laboriosam tempora
              exercitationem dignissimos beatae voluptatibus natus? Eaque cumque
              voluptatum officiis officia commodi totam voluptatibus.
            </p>
          </article>
        </div>
      </section>
      <EliteFour />
      <div className="map">
        <Image src={mapImg} alt="map of tekel" />
      </div>
      {/*<Logo />*/}
    </main>
  );
};

export default Home;
