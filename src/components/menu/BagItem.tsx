import { itemData } from "@/data/itemData";
import Image from "next/image";

interface BagItemProps {
  name: string;
  count: number;
}

const BagItem = ({ name, count }: BagItemProps) => {
  const itemImg = itemData.find((item) => item.name === name)?.img;

  return (
    <li className="bag-item">
      {itemImg && <Image src={itemImg} alt="image of item" width={16} />}{" "}
      <span>
        {name}: {count}
      </span>
    </li>
  );
};

export default BagItem;
