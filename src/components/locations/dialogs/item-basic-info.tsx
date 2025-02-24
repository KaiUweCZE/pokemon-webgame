import { ItemName } from "@/types/item";
import { Coins } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface ItemBasicInfoProps {
  itemName: ItemName;
  price: number;
  img: {
    src: StaticImageData;
    alt: string;
  };
}

const ItemBasicInfo = ({ itemName, price, img }: ItemBasicInfoProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-full bg-primary-accent/20 p-2">
        <Image src={img.src} alt={img.alt} width={20} height={20} className="object-contain" />
      </div>
      <div>
        <h4 className="text-sm capitalize text-amber-200">{itemName}</h4>
        <div className="flex items-center gap-1">
          <Coins className="h-3 w-3 text-amber-100/70" />
          <span className="text-xs text-amber-100/70">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemBasicInfo;
