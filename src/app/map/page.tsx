"use client";
import Image from "next/image";
import "./map.css";
import { useSession } from "next-auth/react";
import { mapData } from "./mapData";
import MapMenu from "./MapMenu";

const MapPage = () => {
  const { data } = useSession();

  if (!data) {
    throw new Error("data is missing");
  }

  const location = data.user.location;

  const locationData = mapData.find((data) => data.name === location);
  return (
    <main className="container-map">
      {locationData?.img && (
        <Image
          src={locationData?.img}
          alt="cross road img"
          width={1456}
          height={816}
        />
      )}
      {locationData?.routes && (
        <MapMenu routes={locationData?.routes} fight={locationData.fight} />
      )}
    </main>
  );
};

export default MapPage;
