"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import profBloom from "@/assets/images/characters/profbloom.webp";
import mapImg from "@/assets/images/map-labels.png";
import { useState } from "react";
import EliteFour from "@/components/main-page-components/EliteFour";
import conradImg from "@/assets/images/characters/conrad.webp";
import Logo from "@/components/Logo";
import Hero from "@/components/main-page-components/Hero";
import Champion from "@/components/main-page-components/Champion";

const Home = () => {
  const { data, update } = useSession();
  const [active, setActive] = useState({ isActive: false, index: 0 });

  const loger = () => {
    console.log("data: ", data?.user);
  };

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
