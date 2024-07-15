"use client";
import Image from "next/image";
import "./map.css";
import { useSession } from "next-auth/react";
import { mapData } from "./mapData";
import MapMenu from "./MapMenu";
import { useState } from "react";
import MapLoader from "./MapLoader";
import MapError from "./MapError";

const MapPage = () => {
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
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
          priority={true}
        />
      )}
      {locationData?.routes && (
        <MapMenu
          routes={locationData?.routes}
          fight={locationData.fight}
          setLoader={setLoader}
          setError={setError}
        />
      )}
      <h2>{location}</h2>
      {loader && <MapLoader />}
      {error && <MapError setError={setError} />}
    </main>
  );
};

export default MapPage;
