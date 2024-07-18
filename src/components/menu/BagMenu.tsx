"use client";
import { useSession } from "next-auth/react";
import BagItem from "./BagItem";

const BagMenu = () => {
  const { data } = useSession();
  if (!data) {
    throw new Error("data is missing");
  }

  const items = data.user.items;

  return (
    <section className="bag">
      <div>
        <h3>Bag</h3>
        <ul>
          {items.map((item, index) => (
            <BagItem key={index} name={item.item} count={item.count} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BagMenu;
