import { itemData } from "@/data/itemData";
import { useState } from "react";

interface MarketItemProps {
  itemName: string;
  count: number;
  handleBuy: (item: string, cost: number, amount: number) => void;
  handleSell: (item: string, cost: number, amount: number) => void;
}

const MarketItem = ({
  itemName,
  count,
  handleBuy,
  handleSell,
}: MarketItemProps) => {
  const [sellAmount, setSellAmount] = useState({ index: 0, count: 0 });
  const [buyAmount, setBuyAmount] = useState({ index: 0, count: 0 });
  const item = itemData.find((i) => i.name === itemName);

  return (
    <li className="market-item">
      <span>{item?.name}</span>
      <div className="market-box">
        <div className="market-box-item">
          <input
            className="market-input"
            type="number"
            name=""
            id=""
            onChange={(e) =>
              setBuyAmount({
                index: item?.id ? item.id : 0,
                count: parseInt(e.target.value),
              })
            }
          />
          <button
            className="button-primary"
            onClick={() =>
              handleBuy(
                itemName,
                item?.cost ? item.cost : 1,
                buyAmount.count > 0 ? buyAmount.count : 1
              )
            }
          >
            buy
          </button>
        </div>
        <div className="market-box-item">
          <input
            className="market-input"
            type="number"
            name=""
            id=""
            onChange={(e) =>
              setSellAmount({
                index: item?.id ? item.id : 0,
                count: parseInt(e.target.value),
              })
            }
          />
          <button
            className="button-primary"
            onClick={() =>
              handleSell(
                itemName,
                item?.cost ? item.cost : 1,
                sellAmount.count > 0 ? sellAmount.count : 1
              )
            }
          >
            sell
          </button>
        </div>
        <span>{count}</span>
      </div>
      {/*amount.count > 0 && (
        <div className="me">
          {item?.cost ? <p>{item?.cost * amount.count}</p> : <p>free</p>}
        </div>
      )*/}
    </li>
  );
};

export default MarketItem;
