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
        <span className="tag">willys barn</span>
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
        <span className="tag">gastly tower</span>
      </div>
      <div
        className={
          location === "magical forest"
            ? "map-item eleventh active"
            : "map-item eleventh"
        }
      >
        <span className="tag">magical forest</span>
      </div>
      <div
        className={
          location === "ice scream"
            ? "map-item twelfth active"
            : "map-item twelfth"
        }
      >
        <span className="tag">ice scream</span>
      </div>
      <div
        className={
          location === "waterfalls"
            ? "map-item thirteenth active"
            : "map-item thirteenth"
        }
      >
        <span className="tag">waterfalls</span>
      </div>
      <div
        className={
          location === "monastry"
            ? "map-item fourteenth active"
            : "map-item fourteenth"
        }
      >
        <span className="tag">monastry</span>
      </div>
      <div
        className={
          location === "northmandic"
            ? "map-item fifteenth active"
            : "map-item fifteenth"
        }
      >
        <span className="tag">northmandic</span>
      </div>
      <div
        className={
          location === "teleport"
            ? "map-item sixteenth active"
            : "map-item sixteenth"
        }
      >
        <span className="tag">teleport</span>
      </div>
      <div
        className={
          location === "castle"
            ? "map-item seventeenth active"
            : "map-item seventeenth"
        }
      >
        <span className="tag">castle</span>
      </div>
      <div
        className={
          location === "jungle"
            ? "map-item eighteenth active"
            : "map-item eighteenth"
        }
      >
        <span className="tag">jungle</span>
      </div>
      <div
        className={
          location === "macho pichu"
            ? "map-item nineteenth active"
            : "map-item nineteenth"
        }
      >
        <span className="tag">macho pichu</span>
      </div>
      <div
        className={
          location === "redwood"
            ? "map-item twentieth active"
            : "map-item twentieth"
        }
      >
        <span className="tag">redwood</span>
      </div>
      <div
        className={
          location === "yummy desert"
            ? "map-item twenty-first active"
            : "map-item twenty-first"
        }
      >
        <span className="tag">yummy desert</span>
      </div>
      <div
        className={
          location === "safari"
            ? "map-item twenty-second active"
            : "map-item twenty-second"
        }
      >
        <span className="tag">safari</span>
      </div>
      <div
        className={
          location === "swamp"
            ? "map-item twenty-third active"
            : "map-item twenty-third"
        }
      >
        <span className="tag">swamp</span>
      </div>
      <div
        className={
          location === "futurome"
            ? "map-item twenty-fourth active"
            : "map-item twenty-fourth"
        }
      >
        <span className="tag">futurome</span>
      </div>
    </div>
  );
};

export default MenuMap;
