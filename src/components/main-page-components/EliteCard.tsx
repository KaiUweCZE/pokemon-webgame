import { useClickOutside } from "@/hooks/useClickOutside";
import Image, { StaticImageData } from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

interface EliteCardProps {
  img: StaticImageData;
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  index: number;
  name: string;
}

const EliteCard = ({
  img,
  activeIndex,
  setActiveIndex,
  index,
  name,
}: EliteCardProps) => {
  const [active, setActive] = useState(false);
  const { initState } = useClickOutside(setActive, active, ".elite-card");
  return (
    <div className={initState ? "elite-card active" : "elite-card"}>
      <Image
        src={img}
        alt="member of elite four"
        onClick={() => {
          setActive(!active);
        }}
      />
      <article className={index > 2 ? "left" : ""}>
        <h3>{name}</h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          mollitia dolore omnis necessitatibus odio eius, facilis repudiandae
          temporibus nisi, voluptate ut, quidem laboriosam quos placeat illo
          alias amet ipsam dolorem!
        </p>
      </article>
    </div>
  );
};

export default EliteCard;
