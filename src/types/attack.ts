import { StaticImageData } from "next/image";

export interface Attack {
  name: string;
  damage: number;
  recoveryTime: number;
  energyCost: number;
  img: StaticImageData;
}
