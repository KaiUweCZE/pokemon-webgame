import { BattleContext } from "@/contexts/BattleContext";
import { itemData } from "@/data/itemData";
import useCatchPokemon from "@/hooks/useCatchPokemon";
import { Item } from "@/types/item";
import { useContext } from "react";

const BagItem = ({ name, count }: Item) => {
  const data = itemData.find((item) => item.name === name);
  const context = useContext(BattleContext);
  const { handleCatch, user } = useCatchPokemon();

  const handleClick = () => {
    if (user && context?.enemyPokemon) {
      handleCatch(user?.name, context?.enemyPokemon);
    }
  };

  return (
    <li className="battle-bag-item">
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
