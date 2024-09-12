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
    </main>
  );
};

export default Home;

/*
      animation sketch
import pikachuImg from "@/assets/images/pokemons/pikachu.webp";
import raichuImg from "@/assets/images/pokemons/raichu.webp";
import evolutionGif from "@/assets/images/gif/evolution.gif";
import { useState } from "react";



      const [start, setStart] = useState(false);

  const handeStart = () => {
    setStart(true);
    setTimeout(() => {
      setStart(() => false);
    }, 7000);
  };
      <div
        className={start ? "evolution-profi-box start" : "evolution-profi-box"}
      >
        <Image
          className="old-evolution"
          src={pikachuImg}
          alt="image of pokemon"
          width={100}
          height={100}
        />
        <Image
          className="new-evolution"
          src={raichuImg}
          alt="image of pokemon"
          width={100}
          height={100}
        />
        <Image
          className="evolution-gif"
          src={evolutionGif}
          alt="image of pokemon"
          width={150}
          height={150}
        />
      </div>
      <button className="button-primary" onClick={handeStart}>
        evolve
      </button>*/
