"use client";
import useChangeLocation from "@/hooks/useChangeLocation";
import { useContext } from "react";
import { MapContext } from "./MapContext";

interface RoutesProps {
  routes: string[];
}

const MapRoutes = ({ routes }: RoutesProps) => {
  const { handleChangeLocation } = useChangeLocation();
  return (
    <ul className="routes-list">
      {routes.map((route, index) => (
        <li key={index} onClick={() => handleChangeLocation(route)}>
          {route}
        </li>
      ))}
    </ul>
  );
};

export default MapRoutes;
