import PokeballButton from "@/components/utils-buttons/PokeballButton";
import PotionButton from "@/components/utils-buttons/PotionButton";
import { itemData } from "@/data/itemData";
import { Item } from "@/types/item";

const BagItem = ({ name, count }: Item) => {
  const data = itemData.find((item) => item.name === name);

  const generateButton = () => {
    if (name === "pokeball") {
      return <PokeballButton />;
    }
    if (name === "potion") {
      return <PotionButton potionType="potion" />;
    } else {
      return <button>nothing to do</button>;
    }
  };

  return (
    <li className="battle-bag-item">
      <span>
        {name}: {count}
      </span>
      {name !== "coins" && generateButton()}
    </li>
  );
};

export default BagItem;
