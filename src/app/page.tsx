"use client";
import Image from "next/image";
import mapImg from "@/assets/images/map-labels.png";
import EliteFour from "@/components/main-page-components/EliteFour";
import Hero from "@/components/main-page-components/Hero";
import Champion from "@/components/main-page-components/Champion";

const Home = () => {
  return (
    <main className="container-home">
      <Hero />
      <Champion />
      <EliteFour />
      <div className="map">
        <Image src={mapImg} alt="map of tekel" />
      </div>
      {/*<Logo />*/}
    </main>
  );
};

export default Home;
