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
import Loader from "@/components/Loader";

const MapPage = () => {
  const context = useContext(MapContext);
  const { data } = useSession();

  if (!context) {
    throw new Error("context is missing");
  }

  const { loader, error, setError, npc } = context;
  const location = data?.user.location;

  const locationData = mapData.find((data) => data.name === location);
  return (
    <main className="container-map">
      {locationData?.img && (
        <Image
          className="main-image"
          src={locationData?.img}
          alt="cross road img"
          width={1456}
          height={816}
          priority={true}
          placeholder="blur"
          quality={15}
        />
      )}
      {locationData?.routes && location && (
        <MapMenu
          options={locationData?.options}
          routes={locationData?.routes}
          fight={locationData.fight}
          location={location}
        />
      )}
      <h2>{location}</h2>
      {/*loader && <MapLoader />*/}
      {error && <MapError setError={setError} />}
      {npc !== "" && <NpcBox name={npc} />}
    </main>
  );
};

export default MapPage;
