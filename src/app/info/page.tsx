"use client";
import { infoPageId } from "./data/infoPageData";
import "./info-style.css";
import InfoArticle from "./InfoArticle";
import InfoNavigation from "./InfoNavigation";

const InfoPage = () => {
  return (
    <div className="wrapper-info">
      <main className="container-info">
        {/*<InfoNavigation />*/}
        <section className="base-info">
          {infoPageId?.map((id) => (
            <InfoArticle key={id} id={id} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default InfoPage;
