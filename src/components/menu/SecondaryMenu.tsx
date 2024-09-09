"use client";
import Image from "next/image";
import pokedexIcon from "@/assets/images/icons/pokedex1.webp";
import mapIcon from "@/assets/images/icons/mapIcon.webp";
import bagIcon from "@/assets/images/icons/bagIcon.webp";
import messageIcon from "@/assets/images/icons/envelope.webp";
import { useContext, useState } from "react";
import MapInMenu from "./MapInMenu";
import PokedexInMenu from "./pokedex/PokedexInMenu";
import BagInMenu from "./bag/BagInMenu";
import { PokedexProvider } from "./pokedex/PokedexContext";
import MessageInMenu from "./message/MessageInMenu";
import { MessageContext, MessageProvider } from "./message/MessageContext";
import { useFetchMessages } from "./message/hooks/useFetchMessages";
import useLoadSixToContext from "@/hooks/useLoadSixToContext";

interface LocationProps {
  location: string;
  userId: string;
}

export enum MenuType {
  BAG = "BAG",
  POKEDEX = "POKEDEX",
  MAP = "MAP",
  MESSAGE = "MESSAGE",
}

const SecondaryMenu = ({ location, userId }: LocationProps) => {
  const [active, setActive] = useState<MenuType | null>(null);
  const context = useContext(MessageContext);
  const { error, isLoading } = useFetchMessages(userId);
  //useLoadSixToContext("secondary");
  const itemWidth = 24;
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
          <div className="secondary-menu-img">
            <Image
              className="secondary-menu-img"
              src={messageIcon}
              alt="icon of message"
              width={itemWidth}
              onClick={() => handleOptions(MenuType.MESSAGE)}
            />
            {context && !!context.numberOfNewMessages && (
              <span>{context.numberOfNewMessages}</span>
            )}
          </div>
          <Image
            className="secondary-menu-img"
            src={bagIcon}
            alt="icon of bag"
            width={itemWidth}
            onClick={() => handleOptions(MenuType.BAG)}
          />
          <Image
            className="secondary-menu-img"
            src={mapIcon}
            alt="icon of map"
            width={itemWidth}
            onClick={() => handleOptions(MenuType.MAP)}
          />
          <Image
            className="secondary-menu-img"
            src={pokedexIcon}
            alt="icon of pokedex"
            width={itemWidth}
            onClick={() => handleOptions(MenuType.POKEDEX)}
          />
        </div>
        {active === MenuType.MAP && (
          <MapInMenu setActive={setActive} location={location} />
        )}
        {active === MenuType.POKEDEX && (
          <PokedexProvider>
            <PokedexInMenu setActive={setActive} />
          </PokedexProvider>
        )}
        {active === MenuType.BAG && <BagInMenu setActive={setActive} />}
        {active === MenuType.MESSAGE && <MessageInMenu setActive={setActive} />}
      </div>
    </div>
  );
};

export default SecondaryMenu;
