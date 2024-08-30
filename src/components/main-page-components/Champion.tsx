import Image from "next/image";
import conradImg from "@/assets/images/characters/conrad.webp";
import exp from "constants";

const Champion = () => {
  return (
    <section className="section-champion">
      <div className="box-champion">
        <Image src={conradImg} alt="pokemon champion of Tekel" height={400} />
        <article>
          <h2>Champion Conrad</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            ad, enim incidunt nobis id velit temporibus exercitationem aut vel
            repellendus nostrum. Illo iure itaque molestiae unde, amet mollitia
            fugit assumenda. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Vero animi ullam provident cum voluptatum quas nihil maiores
            sint sequi. Mollitia vero ducimus nemo, aliquid dolor vitae vel modi
            amet similique! Quod nesciunt placeat, illum aspernatur quibusdam,
            repudiandae sunt accusantium possimus fuga doloremque veritatis
            culpa aliquam laboriosam tempora exercitationem dignissimos beatae
            voluptatibus natus? Eaque cumque voluptatum officiis officia commodi
            totam voluptatibus.
          </p>
        </article>
      </div>
    </section>
  );
};

export default Champion;
