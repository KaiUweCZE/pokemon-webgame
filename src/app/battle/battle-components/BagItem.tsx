import { BattleContext } from "@/contexts/BattleContext";
import { itemData } from "@/data/itemData";
import { Item } from "@/types/item";
import { useContext } from "react";

const BagItem = ({ name, count }: Item) => {
  const data = itemData.find((item) => item.name === name);
  const context = useContext(BattleContext);

  const randomCatch = () => {
    let number = Math.ceil(Math.random() * 3);
    console.log("numberrrr is : ", number);

    return number > 1;
  };

  const handleClick = async () => {
    if (data?.func && context?.enemyPokemon) {
      context?.setIsCatching({ underway: true, isSucces: false });
      const isOk = randomCatch();
      if (isOk) {
        await data.func("a", context?.enemyPokemon);
        setTimeout(() => {
          context?.setIsCatching({ underway: false, isSucces: true });
        }, 4000);
      } else {
        setTimeout(() => {
          context.setIsCatching({ underway: false, isSucces: false });
        }, 4000);
      }
    }
  };
  return (
    <li>
      <span>
        {name}: {count}
      </span>
      {data?.func && (
        <button className="button-primary" onClick={handleClick}>
          catch
        </button>
      )}
    </li>
  );
};

export default BagItem;
