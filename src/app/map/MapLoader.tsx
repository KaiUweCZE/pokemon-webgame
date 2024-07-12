import Image from "next/image";
import pika from "@/assets/images/load.gif";

const MapLoader = () => {
  return (
    <div className="loader-pika">
      <div className="loader-background">
        <Image src={pika} alt="pikachu gif" height={100} />
        <span>On the way</span>
      </div>
    </div>
  );
};

export default MapLoader;
