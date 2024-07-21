"use client";
import Image from "next/image";
import "./map.css";
import { useSession } from "next-auth/react";
import { mapData } from "./mapData";
import MapMenu from "./MapMenu";
import MapLoader from "./MapLoader";
import MapError from "./MapError";
import { MapContext, MapProvider } from "./MapContext";
import { useContext } from "react";
import NpcBox from "./NpcBox";

const MapPage = () => {
  const context = useContext(MapContext);
  const { data, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Please log in to view this page.</p>;
  }

  if (!context) {
    throw new Error("context is missing");
  }

  const { loader, error, setError, npc } = context;
  const location = data?.user.location;

  if (!location) {
    return <p>Location data is missing.</p>;
  }

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
          options={locationData?.options}
          routes={locationData?.routes}
          fight={locationData.fight}
          location={location}
        />
      )}
      <h2>{location}</h2>
      {loader && <MapLoader />}
      {error && <MapError setError={setError} />}
      {npc !== "" && <NpcBox name={npc} />}
    </main>
  );
};

export default MapPage;
