import Image from "next/image";
import logo from "@/assets/images/tekel.webp";
import logoGif from "@/assets/images/logo.gif";

const Logo = () => {
  return (
    <div className="logo">
      <Image className="logo-image" src={logo} alt="logo" width={100} />
      <Image
        className="logo-animation"
        src={logoGif}
        alt="animation of logo"
        width={100}
        height={90}
      />
    </div>
  );
};

export default Logo;
