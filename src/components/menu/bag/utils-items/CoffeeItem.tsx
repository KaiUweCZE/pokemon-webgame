import { itemData } from "@/data/itemData";
import { Item } from "@/types/item";
import { drinkCoffee } from "@/utils/special-item-utils/drinkCoffee";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface BagItemProps {
  item: Item;
  username: string;
}

const CoffeeItem = ({ item, username }: BagItemProps) => {
  const { data, update } = useSession();
  const itemImg = itemData.find((i) => i.name === "coffee")?.img;

  const handleCoffee = async () => {
    try {
      const updatedUser = await drinkCoffee(username);
      if (updatedUser) {
        await update({
          ...data,
          user: {
            ...data?.user,
            partOfDay: updatedUser.partOfDay,
            items: updatedUser.items,
          },
        });
      }
    } catch (error) {
      console.error("an error occured", error);
    }
  };

  return (
    <div className="bag-item useable" onClick={handleCoffee}>
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

export default CoffeeItem;
