import Image, { StaticImageData } from "next/image";
import { Dispatch, SetStateAction } from "react";

interface ActiveType {
  isActive: boolean;
  index: number;
}

interface EliteCardProps {
  img: StaticImageData;
  active: ActiveType;
  setActive: Dispatch<SetStateAction<ActiveType>>;
  index: number;
  name: string;
}
const EliteCard = ({ img, active, setActive, index, name }: EliteCardProps) => {
  return (
    <div
      className={
        active.isActive && active.index === index
          ? "elite-card active"
          : "elite-card"
      }
    >
      <Image
        src={img}
        alt="member of elite four"
        onClick={() => setActive({ isActive: !active.isActive, index: index })}
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
