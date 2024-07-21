"use client";
import { useState } from "react";
import MapRoutes from "./MapRoutes";
import { useRouter } from "next/navigation";
import Market from "@/components/market/Market";
import AboutLocation from "./AboutLocation";
import MapNpcList from "./MapNpcList";

interface MapProps {
  routes: string[];
  fight: boolean;
  options: string[];
  location: string;
}

const MapMenu = ({ location, routes, options }: MapProps) => {
  const [active, setActive] = useState("");
  const router = useRouter();

  const handleOption = () => {
    switch (active) {
      case "Routes":
        return <MapRoutes routes={routes} />;

      case "NPC":
        return <MapNpcList location={location} />;

      case "Poke Centrum":
        return <p>Poke centrum</p>;

      case "Market":
        return <Market location={location} />;

      default:
        return <AboutLocation location={location} />;
    }
  };

  return (
    <div className="map-menu">
      <nav className="menu-navigation">
        <ul>
          {options.map((option, index) => (
            <li key={index} onClick={() => setActive(option)}>
              {option}
            </li>
          ))}
          <li
            onClick={() => {
              router.push("/battle");
            }}
          >
            fight
          </li>
        </ul>
      </nav>
      <div className="box">{handleOption()}</div>
    </div>
  );
};

export default MapMenu;
