import { StaticImageData } from "next/image";

export interface Attack {
  name: string;
  type: string;
  damage: number;
  recoveryTime: number;
  energyCost: number;
  img: StaticImageData;
}
