"use client";
import Image from "next/image";
import pokedexIcon from "@/assets/images/icons/pokedex1.webp";
import mapIcon from "@/assets/images/icons/mapIcon.webp";
import bagIcon from "@/assets/images/icons/bagIcon.webp";
import messageIcon from "@/assets/images/icons/envelope.webp";
import { useState } from "react";
import MapInMenu from "./MapInMenu";
import PokedexMenu from "./pokedex/PokedexMenu";
import BagMenu from "./BagMenu";
import { PokedexProvider } from "./pokedex/PokedexContext";
import MessageMenu from "./MessageMenu";

interface LocationProps {
  location: string;
}

enum MenuType {
  BAG = "BAG",
  POKEDEX = "POKEDEX",
  MAP = "MAP",
  MESSAGE = "MESSAGE",
}

const SecondaryMenu = ({ location }: LocationProps) => {
  const [active, setActive] = useState<MenuType | null>(null);

  const handleOptions = (e: MenuType) => {
    if (active === e) {
      setActive(null);
    } else {
      setActive(e);
    }
  };

  return (
    <div className="secondary-menu">
      <div className="container-secondary-menu">
        <div className="icon-box">
          <Image
            className="secondary-menu-img"
            src={messageIcon}
            alt="icon of message"
            width={24}
            onClick={() => handleOptions(MenuType.MESSAGE)}
          />
          <Image
            className="secondary-menu-img"
            src={bagIcon}
            alt="icon of bag"
            width={24}
            onClick={() => handleOptions(MenuType.BAG)}
          />
          <Image
            className="secondary-menu-img"
            src={mapIcon}
            alt="icon of map"
            width={24}
            onClick={() => handleOptions(MenuType.MAP)}
          />
          <Image
            className="secondary-menu-img"
            src={pokedexIcon}
            alt="icon of pokedex"
            width={24}
            onClick={() => handleOptions(MenuType.POKEDEX)}
          />
        </div>
        {active === MenuType.MAP && <MapInMenu location={location} />}
        {active === MenuType.POKEDEX && (
          <PokedexProvider>
            <PokedexMenu />
          </PokedexProvider>
        )}
        {active === MenuType.BAG && <BagMenu />}
        {active === MenuType.MESSAGE && <MessageMenu />}
      </div>
    </div>
  );
};

export default SecondaryMenu;
