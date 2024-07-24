"use client";
import { mapData } from "@/app/map/mapData";
import "./market.css";
import { useSession } from "next-auth/react";
import MarketItem from "./MarketItem";
import useTradeItem from "@/hooks/useTradeItem";
import MarketMessage from "./MarketMessage";

interface MarketProps {
  location: string;
}

const Market = ({ location }: MarketProps) => {
  const { data, update } = useSession();
  const { handleBuy, handleSell, error, setError } = useTradeItem();
  const marketData = mapData.find((e) => e.name === location)?.marketItems;

  if (!data) {
    throw new Error("data is missing");
  }

  const coins = data.user.items.find((item) => item.name === "coins");

  const itemCount = (itemName: string) => {
    let item = data.user.items.find((item) => item.name === itemName);
    return item?.count ? item.count : 0;
  };

  return (
    <div className="container-market">
      <ul className="menu-market">
        {marketData?.map((item, index) => (
          <MarketItem
            key={index}
            itemName={item}
            count={itemCount(item)}
            handleBuy={handleBuy}
            handleSell={handleSell}
          />
        ))}
      </ul>
      <span className="coins">
        {coins?.name}: {coins?.count}
      </span>
      {error && <MarketMessage setError={setError} />}
    </div>
  );
};

export default Market;
