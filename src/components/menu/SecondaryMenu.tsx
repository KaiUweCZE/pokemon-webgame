"use client";
import Image from "next/image";
import pokedexIcon from "@/assets/images/icons/pokedex1.webp";
import mapIcon from "@/assets/images/icons/mapIcon.webp";
import bagIcon from "@/assets/images/icons/bagIcon.webp";
import contactIcon from "@/assets/images/icons/phoneIcon.webp";
import { useState } from "react";
import MenuMap from "./MenuMap";
import PokedexMenu from "./PokedexMenu";
import BagMenu from "./BagMenu";

interface LocationProps {
  location: string;
}

const SecondaryMenu = ({ location }: LocationProps) => {
  const [activeMap, setActiveMap] = useState(false);
  const [activePokedex, setActivePokedex] = useState(false);
  const [activeBag, setActiveBag] = useState(false);

  const handleMap = () => {
    setActivePokedex(false);
    setActiveBag(false);
    setActiveMap(!activeMap);
  };

  const handlePokedex = () => {
    setActiveMap(false);
    setActiveBag(false);
    setActivePokedex(!activePokedex);
  };

  const handleBag = () => {
    setActiveMap(false);
    setActivePokedex(false);
    setActiveBag(!activeBag);
  };
  return (
    <div className="secondary-menu">
      <div className="container-secondary-menu">
        <div className="icon-box">
          <Image
            className="secondary-menu-img"
            src={contactIcon}
            alt="icon of pokedex"
            width={24}
            onClick={handlePokedex}
          />
          <Image
            className="secondary-menu-img"
            src={bagIcon}
            alt="icon of bag"
            width={24}
            onClick={handleBag}
          />
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
        {activeBag && <BagMenu />}
      </div>
    </div>
  );
};

export default SecondaryMenu;
