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
      >
        <span className="tag">shire</span>
      </div>
      <div
        className={
          location === "large farm"
            ? "map-item second active"
            : "map-item second"
        }
      >
        <span className="tag">farm</span>
      </div>
      <div
        className={
          location === "mountains" ? "map-item third active" : "map-item third"
        }
      >
        <span className="tag">mountains</span>
      </div>
      <div
        className={
          location === "cave" ? "map-item fourth active" : "map-item fourth"
        }
      >
        <span className="tag">cave</span>
      </div>
      <div
        className={
          location === "bridge" ? "map-item fiveth active" : "map-item fiveth"
        }
      >
        <span className="tag">bridge</span>
      </div>
      <div
        className={
          location === "lovely" ? "map-item sixth active" : "map-item sixth"
        }
      >
        <span className="tag">lovely</span>
      </div>
      <div
        className={
          location === "willy's barn"
            ? "map-item seventh active"
            : "map-item seventh"
        }
      >
        <span className="tag">willy's barn</span>
      </div>
      <div
        className={
          location === "lake" ? "map-item eigth active" : "map-item eigth"
        }
      >
        <span className="tag">lake</span>
      </div>
      <div
        className={
          location === "deep mine" ? "map-item ninth active" : "map-item ninth"
        }
      >
        <span className="tag">deep mine</span>
      </div>
      <div
        className={
          location === "gastly tower"
            ? "map-item tenth active"
            : "map-item tenth"
        }
      >
        <span className="tag">shire</span>
      </div>
      <div
        className={
          location === "magical forest"
            ? "map-item eleventh active"
            : "map-item eleventh"
        }
      >
        <span className="tag">shire</span>
      </div>
      <div
        className={
          location === "ice scream"
            ? "map-item twelfth active"
            : "map-item twelfth"
        }
      >
        <span className="tag">shire</span>
      </div>
      <div
        className={
          location === "waterfalls"
            ? "map-item thirteenth active"
            : "map-item thirteenth"
        }
      >
        <span className="tag">shire</span>
      </div>
      <div
        className={
          location === "monastry"
            ? "map-item fourteenth active"
            : "map-item fourteenth"
        }
      >
        <span className="tag">shire</span>
      </div>
      <div
        className={
          location === "northmandic"
            ? "map-item fifteenth active"
            : "map-item fifteenth"
        }
      >
        <span className="tag">shire</span>
      </div>
      <div
        className={
          location === "teleport"
            ? "map-item sixteenth active"
            : "map-item sixteenth"
        }
      >
        <span className="tag">shire</span>
      </div>
      <div
        className={
          location === "castle"
            ? "map-item seventeenth active"
            : "map-item seventeenth"
        }
      >
        <span className="tag">shire</span>
      </div>
      <div
        className={
          location === "jungle"
            ? "map-item eighteenth active"
            : "map-item eighteenth"
        }
      >
        <span className="tag">shire</span>
      </div>
      <div
        className={
          location === "macho pichu"
            ? "map-item nineteenth active"
            : "map-item nineteenth"
        }
      >
        <span className="tag">shire</span>
      </div>
      <div
        className={
          location === "redwood"
            ? "map-item twentieth active"
            : "map-item twentieth"
        }
      >
        <span className="tag">shire</span>
      </div>
      <span className="tag">shire</span>
    </div>
  );
};

export default MenuMap;
