"use client";
import Image from "next/image";
import pokedexIcon from "@/assets/images/icons/pokedex1.webp";
import mapIcon from "@/assets/images/icons/mapIcon.webp";
import { useState } from "react";
import MenuMap from "./MenuMap";
import PokedexMenu from "./PokedexMenu";

interface LocationProps {
  location: string;
}

const SecondaryMenu = ({ location }: LocationProps) => {
  const [activeMap, setActiveMap] = useState(false);
  const [activePokedex, setActivePokedex] = useState(false);

  const handleMap = () => {
    setActivePokedex(false);
    setActiveMap(!activeMap);
  };

  const handlePokedex = () => {
    setActiveMap(false);
    setActivePokedex(!activePokedex);
  };
  return (
    <div className="secondary-menu">
      <div className="container-secondary-menu">
        <div className="icon-box">
          <Image
            className="secondary-menu-img"
            src={mapIcon}
            alt="icon of map"
            width={24}
            onClick={handleMap}
          />
          <Image
            className="secondary-menu-img"
            src={pokedexIcon}
            alt="icon of pokedex"
            width={24}
            onClick={handlePokedex}
          />
        </div>
        {activeMap && <MenuMap location={location} />}
        {activePokedex && <PokedexMenu />}
      </div>
    </div>
  );
};

export default SecondaryMenu;
