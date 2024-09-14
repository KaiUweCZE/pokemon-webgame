"use client";
import Image from "next/image";
import "./map.css";
import { useSession } from "next-auth/react";
import { mapData } from "./mapData";
import MapMenu from "./MapMenu";
import MapError from "./MapError";
import { MapContext } from "./MapContext";
import { useContext, useEffect, useState } from "react";
import NpcDetail from "./npc-components/NpcDetail";
import placeholderImg from "@/assets/images/countires/crossroad2.webp";

const MapPage = () => {
  const context = useContext(MapContext);
  const { data, status } = useSession();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (status !== "loading" && context) {
      setIsLoaded(true);
    }
  }, [status, context]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!context || !data) {
    throw new Error("context is missing");
  }

  const { loader, error, setError, npc } = context;
  const { location, day, id } = data.user;

  const locationData = mapData.find((data) => data.name === location);

  return (
    <main className="container-map">
      {locationData?.img && (
        <Image
          className="main-image"
          src={locationData?.img || placeholderImg}
          alt="cross road img"
          width={1456}
          height={816}
          sizes="(max-width: 1456px) 100vw, 1456px"
          priority={true}
          placeholder="blur"
          blurDataURL={placeholderImg.blurDataURL}
          quality={15}
        />
      )}
      {locationData?.routes && location && (
        <MapMenu
          options={locationData?.options}
          routes={locationData?.routes}
          fight={locationData.fight}
          location={location}
          username={data.user.name}
        />
      )}
      <h2 className="location-name">{location}</h2>
      {/*loader && <MapLoader />*/}
      {error && <MapError setError={setError} />}
      {npc !== "" && <NpcDetail name={npc} userDay={day} userId={id} />}
    </main>
  );
};

export default MapPage;
