import { buyItem, sellItem } from "@/components/market/action";
import { useSession } from "next-auth/react";
import { useState } from "react";

const useTradeItem = () => {
  const { data, update } = useSession();
  const [error, setError] = useState(false);

  const handleBuy = async (item: string, cost: number, amount: number) => {
    if (!data?.user) return null;

    const updatedUser = await buyItem(data?.user.name, item, cost, amount);

    if (updatedUser) {
      update({
        ...data,
        user: {
          ...updatedUser,
        },
      });
    } else {
      setError(true);
      console.log("You dont have enough money");
    }
    console.log("after bought: ", updatedUser);
  };

  const handleSell = async (item: string, cost: number, amount: number) => {
    if (!data?.user) return null;

    const updatedUser = await sellItem(data?.user.name, item, cost, amount);

    if (updatedUser) {
      update({
        ...data,
        user: {
          ...updatedUser,
        },
      });
    } else {
      setError(true);
      console.log("You dont have enough money");
    }
    console.log("after sell: ", updatedUser);
  };

  return { handleBuy, handleSell, error, setError };
};

export default useTradeItem;
