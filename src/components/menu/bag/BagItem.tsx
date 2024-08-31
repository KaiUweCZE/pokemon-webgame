import { itemData } from "@/data/itemData";
import { Item } from "@/types/item";
import Image from "next/image";

interface BagItemProps {
  item: Item;
}

const BagItem = ({ item }: BagItemProps) => {
  const itemImg = itemData.find((i) => i.name === item.name)?.img;

  return (
    <div className="bag-item">
      {itemImg && (
        <Image
          className="bag-item-image"
          src={itemImg}
          alt="image of item"
          width={16}
        />
      )}{" "}
      <span>{item.count}</span>
    </div>
  );
};

export default BagItem;
