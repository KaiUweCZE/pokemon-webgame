"use client";
import useChangeLocation from "@/hooks/useChangeLocation";
import { useContext, useState } from "react";
import { MapContext } from "./MapContext";
import AlertWindow from "@/components/AlertWindow";

interface RoutesProps {
  routes: string[];
}

const MapRoutes = ({ routes }: RoutesProps) => {
  const [specificRoute, setSpecificRoute] = useState("");
  const [active, setActive] = useState(false);
  const { handleChangeLocation } = useChangeLocation();

  const handleAlert = (e: string) => {
    if (specificRoute !== e && active) {
      setActive(true);
      setSpecificRoute(e);
    }
    if (!active) {
      setActive(true);
      setSpecificRoute(e);
    }
  };
  return (
    <ul className="routes-list">
      {routes.map((route, index) => (
        <li className="item" key={index} onClick={() => handleAlert(route)}>
          {route}
        </li>
      ))}
      {active && specificRoute && (
        <AlertWindow
          onClickUtil={() => handleChangeLocation(specificRoute)}
          message={`Would you like ${specificRoute} to be your next destination?`}
          active={active}
          setActive={setActive}
        />
      )}
    </ul>
  );
};

export default MapRoutes;
