import Image from "next/image";
import mapImg from "@/assets/images/map.webp";

interface LocationProps {
  location: string;
}

const MenuMap = ({ location }: LocationProps) => {
  return (
    <div className="menu-map">
      <Image
        src={mapImg}
        alt="map of region"
        fill={true}
        sizes="(max-width: 100%)"
      />
      <div
        className={
          location === "home" ? "map-item first active" : "map-item first"
        }
      ></div>
      <div
        className={
          location === "castle" ? "map-item second active" : "map-item second"
        }
      ></div>
      <div
        className={
          location === "cave" ? "map-item third active" : "map-item third"
        }
      ></div>
      <div
        className={
          location === "mountains"
            ? "map-item fourth active"
            : "map-item fourth"
        }
      ></div>
      <div
        className={
          location === "bridge" ? "map-item fiveth active" : "map-item fiveth"
        }
      ></div>
      <div
        className={
          location === "ho" ? "map-item sixth active" : "map-item sixth"
        }
      ></div>
      <div
        className={
          location === "ho" ? "map-item seventh active" : "map-item seventh"
        }
      ></div>
      <div
        className={
          location === "ho" ? "map-item eigth active" : "map-item eigth"
        }
      ></div>
    </div>
  );
};

export default MenuMap;
