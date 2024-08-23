import Image from "next/image";
//import goIn from "@/assets/images/gif/goout.gif";
import goIn from "@/assets/images/gif/go-500ms-delay.gif";

const BattleStartImage = () => {
  return (
    <Image
      className="user-pokemon-go-in"
      src={goIn}
      alt="user pokemon coming in"
      height={220}
    />
  );
};

export default BattleStartImage;
