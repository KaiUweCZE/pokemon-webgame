"use client";
import Image from "next/image";
import pokedexIcon from "@/assets/images/icons/pokedex1.webp";
import mapIcon from "@/assets/images/icons/mapIcon.webp";
import bagIcon from "@/assets/images/icons/bagIcon.webp";
import contactIcon from "@/assets/images/icons/phoneIcon.webp";
import { useState } from "react";
import MapInMenu from "./MapInMenu";
import PokedexMenu from "./PokedexMenu";
import BagMenu from "./BagMenu";
import ContactsMenu from "./ContactsMenu";
import useClickOutside from "@/hooks/useClickOutside";

interface LocationProps {
  location: string;
}

const SecondaryMenu = ({ location }: LocationProps) => {
  const [active, setActive] = useState("");

  const handleOptions = (e: string) => {
    if (active === e) {
      setActive("");
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
            src={contactIcon}
            alt="icon of pokedex"
            width={24}
            onClick={() => handleOptions("contacts")}
          />
          <Image
            className="secondary-menu-img"
            src={bagIcon}
            alt="icon of bag"
            width={24}
            onClick={() => handleOptions("bag")}
          />
          <Image
            className="secondary-menu-img"
            src={mapIcon}
            alt="icon of map"
            width={24}
            onClick={() => handleOptions("map")}
          />
          <Image
            className="secondary-menu-img"
            src={pokedexIcon}
            alt="icon of pokedex"
            width={24}
            onClick={() => handleOptions("pokedex")}
          />
        </div>
        {active === "map" && <MapInMenu location={location} />}
        {active === "pokedex" && <PokedexMenu />}
        {active === "bag" && <BagMenu />}
        {active === "contacts" && <ContactsMenu />}
      </div>
    </div>
  );
};

export default SecondaryMenu;
