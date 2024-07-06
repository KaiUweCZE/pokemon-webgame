import pikachuLoader from "@/assets/images/pikachu-loader2.gif";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="container-loader">
      <Image
        src={pikachuLoader}
        alt="pikachu loader"
        width={200}
        height={150}
      />
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
