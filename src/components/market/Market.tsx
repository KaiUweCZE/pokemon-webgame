"use client";
import { mapData } from "@/app/map/mapData";
import "./market.css";
import { buyItem } from "./action";
import { useSession } from "next-auth/react";

interface MarketProps {
  location: string;
}

const Market = ({ location }: MarketProps) => {
  const { data, update } = useSession();
  const marketData = mapData.find((e) => e.name === location)?.marketItems;

  if (!data) {
    throw new Error("data is missing");
  }

  const handleBuy = async (item: string) => {
    const updatedUser = await buyItem(data?.user.name, item, 1, 1);

    if (updatedUser) {
      update({
        ...data,
        user: {
          ...updatedUser,
        },
      });
    }
    console.log("after bought: ", updatedUser);
  };
  return (
    <div className="container-market">
      <ul className="menu-market">
        {marketData?.map((item, index) => (
          <li key={index}>
            <span>{item}</span>
            <div>
              <button
                className="button-primary"
                onClick={() => handleBuy(item)}
              >
                buy
              </button>
              <button className="button-primary">sell</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Market;
