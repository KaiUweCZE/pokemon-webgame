import { Item } from "@/types/item";
import CoffeeItem from "./CoffeeItem";
import BagItem from "../BagItem";

interface BagItemProps {
  item: Item;
  username: string;
}

const GenerateBagItem = ({ item, username }: BagItemProps) => {
  const handleBagItem = (itemName: string) => {
    switch (itemName) {
      case "coffee":
        return <CoffeeItem item={item} username={username} />;
      default:
        return <BagItem item={item} />;
    }
  };

  return <>{handleBagItem(item.name)}</>;
};

export default GenerateBagItem;
