import Image from "next/image";
import heartBeat from "@/assets/images/icons/heartbeat.webp";

const HeartBeatLoader = () => {
  return (
    <div className="heart-beat">
      <svg width="64px" height="48px">
        <polyline
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
          id="back"
        ></polyline>
        <polyline
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
          id="front"
        ></polyline>
      </svg>
    </div>
  );
};

export default HeartBeatLoader;
