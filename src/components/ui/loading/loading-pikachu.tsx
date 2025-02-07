import Image from "next/image";
import pikachuLoader from "@/images/load.gif";

const LoadingPikachu = () => {
  return (
    <div className="blur-on absolute inset-0 z-50 flex items-center justify-center rounded-lg backdrop-blur-sm">
      <div className="absolute grid place-self-center">
        <Image src={pikachuLoader} alt="Pikachu loader" width={200} height={200} />
        <span className="place-self-center text-2xl font-semibold text-amber-100">
          On the journey...
        </span>
        <span className="loader"></span>
      </div>
    </div>
  );
};

export default LoadingPikachu;
