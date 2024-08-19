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
import placeholderImg from "@/assets/images/countires/crossroad2.webp";
import { ImageLoader } from "next/image";

const MapPage = () => {
  const context = useContext(MapContext);
  const { data } = useSession();

  if (!context) {
    throw new Error("context is missing");
  }

  const { loader, error, setError, npc } = context;
  const location = data?.user.location;

  const locationData = mapData.find((data) => data.name === location);

  /*const imageLoader: ImageLoader = ({ src, width, quality }) => {
    console.log("loader is running", { src, width, quality });

    const baseUrl = src || placeholderImg.src;

    const params = new URLSearchParams();
    if (width) params.append("w", width.toString());
    if (quality) params.append("q", quality.toString());

    console.log("params: ", params);

    const url = new URL(baseUrl, window.location.origin);
    url.search = params.toString();

    console.log("url: ", url);
    console.log("url.search: ", url.search);

    return url.toString();
  };*/

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
          //loader={imageLoader}
          //onLoad={(e) => console.log("done!", e.target)}
          //onLoad={}
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
