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
          location === "shire" ? "map-item first active" : "map-item first"
        }
      ></div>
      <div
        className={
          location === "large farm"
            ? "map-item second active"
            : "map-item second"
        }
      ></div>
      <div
        className={
          location === "mountains" ? "map-item third active" : "map-item third"
        }
      ></div>
      <div
        className={
          location === "cave" ? "map-item fourth active" : "map-item fourth"
        }
      ></div>
      <div
        className={
          location === "bridge" ? "map-item fiveth active" : "map-item fiveth"
        }
      ></div>
      <div
        className={
          location === "lovely" ? "map-item sixth active" : "map-item sixth"
        }
      ></div>
      <div
        className={
          location === "willy's barn"
            ? "map-item seventh active"
            : "map-item seventh"
        }
      ></div>
      <div
        className={
          location === "lake" ? "map-item eigth active" : "map-item eigth"
        }
      ></div>
      <div
        className={
          location === "deep mine" ? "map-item ninth active" : "map-item ninth"
        }
      ></div>
      <div
        className={
          location === "gastly tower"
            ? "map-item tenth active"
            : "map-item tenth"
        }
      ></div>
      <div
        className={
          location === "magical forest"
            ? "map-item eleventh active"
            : "map-item eleventh"
        }
      ></div>
      <div
        className={
          location === "ice scream"
            ? "map-item twelfth active"
            : "map-item twelfth"
        }
      ></div>
      <div
        className={
          location === "waterfalls"
            ? "map-item thirteenth active"
            : "map-item thirteenth"
        }
      ></div>
      <div
        className={
          location === "monastry"
            ? "map-item fourteenth active"
            : "map-item fourteenth"
        }
      ></div>
      <div
        className={
          location === "northmandic"
            ? "map-item fifteenth active"
            : "map-item fifteenth"
        }
      ></div>
      <div
        className={
          location === "teleport"
            ? "map-item sixteenth active"
            : "map-item sixteenth"
        }
      ></div>
      <div
        className={
          location === "castle"
            ? "map-item seventeenth active"
            : "map-item seventeenth"
        }
      ></div>
      <div
        className={
          location === "jungle"
            ? "map-item eighteenth active"
            : "map-item eighteenth"
        }
      ></div>
      <div
        className={
          location === "macho pichu"
            ? "map-item nineteenth active"
            : "map-item nineteenth"
        }
      ></div>
      <div
        className={
          location === "redwood"
            ? "map-item twentieth active"
            : "map-item twentieth"
        }
      ></div>
    </div>
  );
};

export default MenuMap;
